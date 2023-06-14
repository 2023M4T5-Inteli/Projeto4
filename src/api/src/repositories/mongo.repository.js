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
                    refs.push(schemaPath ? `${schemaPath}.${path}` : path);
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

    normalizeFiltersBySchemaFields(filters) {
        const normalizedFilters = {};
        Object.entries(filters)
            .filter((entrie) => {
                return Object.keys(this.schema.paths).includes(entrie[0]);
            })
            .map((entrie) => {
                const schemaAttribute = this.schema.paths[entrie[0]];
                if (schemaAttribute.instance == 'ObjectId') {
                    if (!mongoose.Types.ObjectId.isValid(entrie[1])) {
                        throw new InternalServerError("Object isn't valid");
                    }
                    entrie[1] = entrie[1];
                } else if (schemaAttribute.instance == 'Boolean') {
                    entrie[1] = !!entrie[1];
                } else if (schemaAttribute.instance == 'Number') {
                    entrie[1] = entrie[1];
                } else if (schemaAttribute.instance == 'String') {
                    entrie[1] = {
                        $regex: new RegExp(entrie[1], 'i'),
                    };
                } else if (schemaAttribute.instance == 'Date') {
                    entrie[1] = new Date(entrie[1]);
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
