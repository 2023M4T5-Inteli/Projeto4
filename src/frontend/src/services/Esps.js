import { BASE_URL, normalizeFilter } from "./Service";

export const getEsps = (isAI, filter) => {
    return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}esps${ filter ? `?filter=${normalizeFilter(filter)}` : '' }`)
        .then((response) => response.json())
        .then( isAI ? (data) => { 
          const newDataIa = data.map(item => ({
            ...item,
            espSector: item.iaEspSector
          }))    
          resolve(newDataIa);
        }
        :
        (data) => {
          const newData = data.map(item => ({
            ...item,
            espSector: item.espSector
          }))    
          resolve(newData);

        }
        )
        .catch((error) => {
          reject(error);
        });
    }) 
}