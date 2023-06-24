import { BASE_URL, normalizeFilter } from "./Service";

export const getRouters = (filter) => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}esp-routers${ filter ? `?filter=${normalizeFilter(filter)}` : '' }`)
        .then((response) => response.json())
        .then(data => {     
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }) 
}