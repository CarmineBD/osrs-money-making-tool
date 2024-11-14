import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, totalProducts, onVerifyProduct }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(products); // Actualiza la lista filtrada de productos
            setLoading(false); // Finaliza la carga una vez que los productos están establecidos
        } else {
            setLoading(true); // Muestra "Cargando..." si no hay productos
        }
    }, [products]);

    return (
        <div style={{ width: '100%' }}>
            <h1>Productos Reservados ({filteredProducts.length}) de ({totalProducts})</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Imágenes</th>
                        <th>Inputs</th>
                        <th>Precios</th>
                        <th>Fechas</th>
                        <th>Localización</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                asdasd
                                <img src="/assets/loading.gif" alt="Cargando..." />
                            </td>

                        </tr>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductItem
                                key={product.id} // Añade una clave única para cada elemento
                                product={product}
                                onVerifyProduct={onVerifyProduct}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
