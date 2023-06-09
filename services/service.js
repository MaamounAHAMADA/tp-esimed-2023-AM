
import API_URL from '../js/config.js';

export default class Mon_API {


    getFetch(url) {
        const token = localStorage.getItem('token')
        return new Promise(((resolve, reject) => {
            fetch(`${API_URL}/${url}`,
                {headers: {
                'Authorization': `Bearer ${token}` // Ajoute le token d'autorisation dans le header
            }})
                .then(response => {
                    if (response.ok) {

                        resolve(response.json())
                      //  console.log `Reponse JSON : ${response}`

                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))
    }





    async postFetch(url, body) {

        let success = false
        try {
            const response = await fetch(`${API_URL}/${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (response.ok && (response.status === 200 || response.status === 201 || response.status === 204)) {
                success = true
                return success;
            } else  {
                return success;
            }
        } catch (error) {
            return success;
        }
    }



    async  putFetch(url, body) {

        try {
            const response = await fetch(`${API_URL}/${url}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (response.status === 200 || response.status === 204) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                // Si la réponse est vide, retourner null
                return null;
            }} else {
                throw new Error(` Echec de la requête. Statut :${response.status}`);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteFetch(url) {
        try {
            const response = await fetch(`${API_URL}/${url}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Ajoute le token d'autorisation dans le header
                }
            });
            if (response.status === 204) {
                // Si la réponse est vide, retourner null
                return null;
            } else {
                throw new Error(`Echec de la requête. Statut : ${response.status}`);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



}
