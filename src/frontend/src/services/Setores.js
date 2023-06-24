import { BASE_URL, normalizeFilter } from "./Service";

export const getSetoresWithEsps = (filter) => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}sectors/esps${ filter ? `?${normalizeFilter(filter)}` : '' }`)
        .then((response) => response.json())
        .then(data => {     
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }) 
}

export const getSetores = (filter) => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}sectors${ filter ? `?filter=${normalizeFilter(filter)}` : '' }`)
        .then((response) => response.json())
        .then(data => {     
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }) 
  }

export const postSetor = (setor) => {
    return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}sectors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(setor)
    })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

export const putSetor = (id, setor) => {
    return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}sectors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(setor)
    })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}

export const deleteSetor = (id) => {
    return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}sectors/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
}