import React, { useState, useEffect } from 'react';
import './AsideFilters.css'
import './TextInput'
import TextInput from './TextInput';
import Input from '../ui/Input/Input'
import Select from '../ui/Select/Select'
import Range from '../ui/Range/Range'

const FilterAside = ({ onFilterSubmit }) => {
    const [categoryOptions, setCategoryOptions] = useState([]); // Estado para almacenar las categorías
    const [stateOptions, setStateOptions] = useState([]); // Estado para almacenar las categorías
    const [realStateOptions, setRealStateOptions] = useState([]); // Estado para almacenar las categorías
    const [manualConfirmedOptions, setManualConfirmedOptions] = useState([]); // Estado para almacenar las categorías
    // const [articleStatusOptions, setArticleStatusOptions] = useState([]); // Estado para almacenar las categorías
    const [isAsideVisible, setAsideVisible] = useState(false);
    const [filters, setFilters] = useState({




        min_time_to_sell: '',
        max_time_to_sell: '',
        min_creation_date: '',
        max_creation_date: '',
        min_reserved_date: '',
        max_reserved_date: '',
        min_views: '',
        max_views: '',
        min_favorites: '',
        max_favorites: '',
        min_sale_date: '',
        max_sale_date: '',

        state: '', //select
        real_state: '', //select
        distance: '',
        postal_code: '',
        allows_shipping: '', //checkbox
        city: '',
        article_status: '', //select
        w_brand: '',
        w_model: '',
        w_sub_category: '',
        w_sub_sub_category: '',
        product_type: '',
        brand: '',
        model: '',
        color: '',




        category: [],
        max_price: '',
        min_price: '',
        order_by: '',
        rows: '',
    });

    const toggleAside = () => {
        setAsideVisible(!isAsideVisible);
    };

    const handleFilterSubmit = () => {
        onFilterSubmit(filters);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        console.log(value)
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // Llamada a la API para obtener las categorías
    useEffect(() => {
        fetch('http://localhost:3000/api/data/categories')
            .then(response => response.json())
            .then(data => {
                setCategoryOptions(data); // Actualiza el estado con las categorías obtenidas
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Llamada a la API para obtener los enums de state
    useEffect(() => {
        fetch('http://localhost:3000/api/data/enums?column=state')
            .then(response => response.json())
            .then(data => {
                setStateOptions(data); // Actualiza el estado con las categorías obtenidas
            })
            .catch(error => {
                console.error('Error fetching state enums:', error);
            });
    }, []);

    // Llamada a la API para obtener los enums de real_state
    useEffect(() => {
        fetch('http://localhost:3000/api/data/enums?column=real_state')
            .then(response => response.json())
            .then(data => {
                setRealStateOptions(data); // Actualiza el estado con las categorías obtenidas
            })
            .catch(error => {
                console.error('Error fetching real_state enums:', error);
            });
    }, []);

    // Llamada a la API para obtener los enums de manual_confirmed
    useEffect(() => {
        fetch('http://localhost:3000/api/data/enums?column=manual_confirmed')
            .then(response => response.json())
            .then(data => {
                setManualConfirmedOptions(data); // Actualiza el estado con las categorías obtenidas
            })
            .catch(error => {
                console.error('Error fetching manual_confirmed enums:', error);
            });
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFilterSubmit();
        }
    };

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;

        setFilters(prevFilters => ({
            ...prevFilters,
            category: checked
                ? [...prevFilters.category, value]
                : prevFilters.category.filter((cat) => cat !== value)
        }));
    };

    return (
        <aside >
            {/* <aside > */}


            <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
                <div className=''>
                    <button className="hamburger-button" onClick={toggleAside}>
                        ☰
                    </button>
                </div>
                <div style={{ paddingLeft: '1.5rem' }}>
                    <h2 style={{ position: 'sticky' }}>Filtros</h2>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 'bold' }}>Category:</span><br />
                        {categoryOptions.map((option) => (
                            <label key={option.id}>
                                <input
                                    type="checkbox"
                                    value={option.id}
                                    // checked={category.includes(option.id)}
                                    onChange={handleCategoryChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '48px', padding: '0.5rem' }}>

                        {/* <TextInput title='Sub categoría' name='w_sub_category' valor={filters.w_sub_category} onChange={handleInputChange} ></TextInput> */}

                        <Input
                            type="text"
                            value={filters.w_sub_category}
                            placeholder="Escribe algo..."
                            label="w_sub_category"
                            name="w_sub_category"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}

                        />
                        <Input
                            type="text"
                            value={filters.w_sub_sub_category}
                            placeholder="Escribe algo..."
                            label="w_sub_sub_category"
                            name="w_sub_sub_category"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Select
                            value={filters.state}
                            options={stateOptions}
                            placeholder="Selecciona una opción"
                            label="state"
                            name="state"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Select
                            value={filters.real_state}
                            options={realStateOptions}
                            placeholder="Selecciona una opción"
                            label="real_state"
                            name="real_state"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Select
                            value={filters.manual_confirmed}
                            options={manualConfirmedOptions}
                            placeholder="Selecciona una opción"
                            label="manual_confirmed"
                            name="manual_confirmed"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Select
                            value={filters.article_status}
                            options={['reservado', 'vendido', 'des reservado', 'borrado']}
                            placeholder="Selecciona una opción"
                            label="article_status"
                            name="article_status"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="text"
                            value={filters.creation_date}
                            placeholder="Escribe algo..."
                            label="Fecha exacta (creation_date)"
                            name="creation_date"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Range
                            minValue={filters.min_creation_date}
                            maxValue={filters.max_creation_date}
                            label="Rango de fecha (min/max_creation_date)"
                            name="creation_date"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Range
                            minValue={filters.min_time_to_sell}
                            maxValue={filters.max_time_to_sell}
                            label="time_to_reserved"
                            name="time_to_reserved"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Range
                            minValue={filters.min_reserved_date}
                            maxValue={filters.max_reserved_date}
                            label="reserved_date"
                            name="reserved_date"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Range
                            minValue={filters.min_sale_date}
                            maxValue={filters.max_sale_date}
                            label="sale_date"
                            name="sale_date"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Range
                            minValue={filters.min_views}
                            maxValue={filters.max_views}
                            label="views"
                            name="views"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Range
                            minValue={filters.min_favorites}
                            maxValue={filters.max_favorites}
                            label="favorites"
                            name="favorites"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Range
                            minValue={filters.min_price}
                            maxValue={filters.max_price}
                            label="price"
                            name="price"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="text"
                            value={filters.w_brand}
                            placeholder="Escribe algo..."
                            label="w_brand"
                            name="w_brand"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="text"
                            value={filters.w_model}
                            placeholder="Escribe algo..."
                            label="w_model"
                            name="w_model"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.brand_id}
                            placeholder="Escribe algo..."
                            label="brand_id"
                            name="brand_id"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.product_type_id}
                            placeholder="Escribe algo..."
                            label="product_type_id"
                            name="product_type_id"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.product_type_id}
                            placeholder="Escribe algo..."
                            label="product_type_id"
                            name="product_type_id"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.model_id}
                            placeholder="Escribe algo..."
                            label="model_id"
                            name="model_id"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.color_id}
                            placeholder="Escribe algo..."
                            label="color_id"
                            name="color_id"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.distance}
                            placeholder="Escribe algo..."
                            label="distance"
                            name="distance"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.postal_code}
                            placeholder="Escribe algo..."
                            label="postal_code"
                            name="postal_code"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.postal_code}
                            placeholder="Escribe algo..."
                            label="postal_code"
                            name="postal_code"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Select
                            value={filters.manual_confirmed}
                            options={[0, 1]}
                            placeholder="Selecciona una opción"
                            label="allows_shipping"
                            name="manual_confirmed"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="text"
                            value={filters.city}
                            placeholder="Escribe algo..."
                            label="city"
                            name="city"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Input
                            type="number"
                            value={filters.rows}
                            placeholder="Escribe algo..."
                            label="rows"
                            name="rows"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />


                        <label className={`input ${filters.order_by ? 'modified-input' : ''}`}>
                            Order By: <br />
                            <select name='order_by' value={filters.order_by} onChange={handleInputChange} >
                                <option value="">Select</option>
                                <option value="price_low_to_high">Precio ascendiente</option>
                                <option value="price_high_to_low">Precio descendiente</option>
                                <option value="distance_low_to_high">Distancia ascendiente</option>
                                <option value="distance_high_to_low">Distancia descendiente</option>
                                <option value="creation_date_low_to_high">Fecha publicado ascendiente</option>
                                <option value="creation_date_high_to_low">Fecha publicado descendiente</option>
                                <option value="reserved_date_low_to_high">Fecha reservado ascendiente</option>
                                <option value="reserved_date_high_to_low">Fecha reservado descendiente</option>
                                <option value="time_to_sell_low_to_high">Tiempo en venderse ascendiente</option>
                                <option value="time_to_sell_high_to_low">Tiempo en venderse descendiente</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div onClick={handleFilterSubmit} className='submit-filter' style={{}}>
                    Aplicar filtros
                </div>
            </div>



        </aside>
    );
};

export default FilterAside;
