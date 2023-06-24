const mongoose = require('mongoose');
const InternalServerError = require('../errors/internal-server-error');
const NotFoundError = require('../errors/not-found.error');
const BadRequestError = require('../errors/bad-request.error');

module.exports = class MongoRepository {
    constructor(schema, collectionName) {
        this.schema = schema;
        this.collectionName = collectionName;
        this.model = mongoose.model(this.collectionName, this.schema);
    }

    getSchemaRefs() {
        const refs = [];

        const getRefs = (schema = this.model.schema, schemaPath = '') => {
            schema.eachPath((path, schemaType) => {
                if (schemaType.instance === 'ObjectId' && schemaType.options.ref) {
                    if (schemaType.options.ref == 'Historic') {
                        refs.push({
                            path: schemaType.path,
                            populate: [
                                { path: 'espSector' },
                                { path: 'esp' },
                                { path: 'iaEspSector' },
                                { path: 'maintainer' },
                                { path: 'maintainerSector' },
                                { path: 'router' },
                                { path: 'connections.router' },
                            ],
                        });
                    } else {
                        refs.push(schemaPath ? `${schemaPath}.${path}` : path);
                    }
                } else if (schemaType.instance === 'Array' || schemaType.instance === 'Embedded') {
                    getRefs(schemaType.schema, path);
                }
            });
        };

        getRefs();

        return refs;
    }

    getModelName() {
        return this.model.modelName;
    }

    validateFieldAndValueSchema(path, value) {
        const schemaAttribute = this.schema.paths[path];

        if (!schemaAttribute) {
            return value;
        }

        if (schemaAttribute.instance == 'ObjectId') {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new InternalServerError("Object isn't valid");
            }
            value = value;
        } else if (schemaAttribute.instance == 'Boolean') {
            value = !!value;
        } else if (schemaAttribute.instance == 'Number') {
            value = value;
        } else if (schemaAttribute.instance == 'String') {
            if (schemaAttribute.enumValues && Array.isArray(schemaAttribute.enumValues) && schemaAttribute.enumValues.length) {
                value = value;
            } else {
                value = {
                    $regex: new RegExp(value, 'i'),
                };
            }
        } else if (schemaAttribute.instance == 'Date') {
            value = new Date(value);
        }

        return value;
    }

    normalizeFiltersBySchemaFields(filters) {
        const normalizedFilters = {};
        Object.entries(filters)
            .filter((entrie) => {
                return Object.keys(this.schema.paths).includes(String(entrie[0]).split('.')[0]);
            })
            .map((entrie) => {
                if (Array.isArray(entrie[1])) {
                    entrie[1] = {
                        $in: entrie[1].map((value) => this.validateFieldAndValueSchema(entrie[0], value)),
                    };
                } else {
                    entrie[1] = this.validateFieldAndValueSchema(entrie[0], entrie[1]);
                }

                return entrie;
            })
            .forEach((entrie) => (normalizedFilters[entrie[0]] = entrie[1]));

        return normalizedFilters;
    }

    searchByAllPaths(search, pathTypeToIgnore = ['Boolean']) {
        const normalizedFilters = {};
        const isValidObjectId = mongoose.Types.ObjectId.isValid(search);
        const isValidNumber = !isNaN(search);
        const isValidDate = !isNaN(Date.parse(search));

        if (!isValidObjectId && !pathTypeToIgnore.includes('ObjectId')) {
            pathTypeToIgnore.push('ObjectId');
        }

        if (!isValidNumber && !pathTypeToIgnore.includes('Number')) {
            pathTypeToIgnore.push('Number');
        }

        if (!isValidDate && !pathTypeToIgnore.includes('Date')) {
            pathTypeToIgnore.push('Date');
        }

        let paths = Object.values(this.schema.paths);
        paths = paths.filter((path) => !pathTypeToIgnore.includes(path.instance));

        paths.forEach((path) => {
            normalizedFilters[path.path] = search;
        });

        return normalizedFilters;
    }

    getOrFilter(filters) {
        filters = this.normalizeFiltersBySchemaFields(filters);

        const normalizedOrFilter = { $or: [] };

        Object.entries(filters).forEach((entrie) => {
            const objectFilter = {};
            objectFilter[entrie[0]] = entrie[1];
            normalizedOrFilter.$or.push(objectFilter);
        });

        return normalizedOrFilter;
    }

    getAndFilter(filters) {
        filters = this.normalizeFiltersBySchemaFields(filters);
        return filters;
    }

    normalizeFilters(filters) {
        let normalizedFilters = {};
        if (filters.filter) {
            const allPathsFilter = this.searchByAllPaths(filters.filter);
            normalizedFilters = this.getOrFilter(allPathsFilter);
        }

        normalizedFilters = {
            ...normalizedFilters,
            ...this.getAndFilter(filters),
        };

        return normalizedFilters;
    }

    normalizeOrder(order) {
        if (!order) {
            return {
                createdAt: -1,
            };
        }
        const splitedOrder = String(order).toLowerCase().split('-');
        let orderPath = splitedOrder[0];
        const orderValue = splitedOrder[1] == 'asc' ? 1 : -1;

        const path = Object.keys(this.schema.paths).find((key) => {
            return String(key).toLowerCase() == orderPath;
        });

        let normalizedOrder = {};

        if (path) {
            normalizedOrder[path] = orderValue;
        } else {
            normalizedOrder['createdAt'] = -1;
        }

        return normalizedOrder;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(data) {
        if (!data._id) {
            throw new InternalServerError(`${this.getModelName()} must have and Id to been updated`);
        }

        try {
            return await this.model.updateOne({ _id: data._id }, data, { runValidators: true });
        } catch (err) {
            if (err._message == 'Validation failed') {
                throw new BadRequestError(`${this.getModelName()} error: ${Object.values(err.errors)[0].properties.message}`);
            } else if (err.code === 11000) {
                throw new BadRequestError(`${this.getModelName()} error: ${Object.keys(err.keyValue).join(',')} duplicated`);
            }
            throw new NotFoundError(`${this.getModelName()} not found`);
        }
    }

    async delete(id) {
        if (!id) {
            throw new InternalServerError(`${this.getModelName()} must have and Id to been deleted`);
        }

        try {
            return await this.model.findByIdAndDelete(id);
        } catch (err) {
            throw new NotFoundError(`${this.getModelName()} not found`);
        }
    }

    async findById(id, populates = this.getSchemaRefs()) {
        if (!id) {
            throw new InternalServerError(`${this.getModelName()} must have and Id to been found`);
        }

        try {
            return await this.find({ _id: id }, populates);
        } catch (err) {
            throw new NotFoundError(`${this.getModelName()} not found`);
        }
    }

    async find(filters = {}, populates = this.getSchemaRefs(), sort = null, select = null) {
        try {
            filters = this.normalizeFilters(filters);
        } catch (error) {
            return [];
        }

        const query = this.model.find(filters);

        if (sort) {
            sort = this.normalizeOrder(sort);
            query.sort(sort);
        }

        populates.forEach((populate) => {
            query.populate(populate);
        });

        if (select) {
            query.select(select);
        }

        return (await query.exec())[0] || null;
    }

    async list(filters = {}, populates = this.getSchemaRefs(), sort = null, select = null, limit = null) {
        try {
            filters = this.normalizeFilters(filters);
        } catch (error) {
            return [];
        }

        const query = this.model.find(filters);

        if (sort) {
            sort = this.normalizeOrder(sort);
            query.sort(sort);
        }

        if (select) {
            query.select(select);
        }

        if (limit) {
            query.limit(limit);
        }

        populates.forEach((populate) => {
            query.populate(populate);
        });

        return await query.exec();
    }
};
