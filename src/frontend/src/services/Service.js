export const BASE_URL = 'https://sfqlqf-3000.csb.app/v1/';

export const normalizeFilter = (filter) => {
    let stringfiedFilter = '';
    if(filter) {
        if(typeof filter == 'string'){
            if(filter.includes('=')){
                stringfiedFilter = filter
            }else {
                stringfiedFilter = `filter=${filter}`
            }
        } else if(typeof filter == 'object'){
            stringfiedFilter = Object.entries(filter).map(entrie => {
                return `${entrie[0]}=${entrie[1]}`
            }).join('&');
        }
    }
    return stringfiedFilter;
}