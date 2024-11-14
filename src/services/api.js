const BASE_URL = 'http://localhost:3001/api';

const api = {
    getProducts: () => {
        return fetch(`${BASE_URL}/data`)
            .then((res) => res.json())
            .catch((err) => {
                throw new Error('Error al obtener los datos');
            });
    },

    addProduct: (newProduct) => {
        return fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .catch((err) => {
                throw new Error('Error al agregar el producto');
            });
    },
};

export default api;