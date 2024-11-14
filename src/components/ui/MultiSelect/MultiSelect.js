import React, { useState, useEffect, useRef } from 'react';

const MultiSelect = ({ options, name, onClick, disabled, values, formData, setFormData }) => {
    const [selectedOptions, setSelectedOptions] = useState(
        options.filter(option => values.some(value => value.id === option.id))
    );
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const selectRef = useRef(null);

    useEffect(() => {
        setSelectedOptions(values);
    }, [values]);


    useEffect(() => {
        // Actualizar selectedOptions inmediatamente con los valores iniciales
        const initialSelectedOptions = options.filter(option =>
            values.some(value => value.id === option.id)
        );
        setSelectedOptions(initialSelectedOptions);
    }, []);

    useEffect(() => {
        const newSelectedOptions = options.filter(option =>
            values.some(value => value.id === option.id)
        );
        setSelectedOptions(newSelectedOptions);
    }, [values, options]);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOptionsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
        if (!isOptionsOpen) {
            setSearchTerm('');
        }
    };

    const handleOptionClick = (option) => {
        const isSelected = values.some(selected => selected.id === option.id);

        let updatedOptions;
        if (isSelected) {
            // Si ya está seleccionado, removerlo
            updatedOptions = values.filter(item => item.id !== option.id);
        } else {
            // Si no está seleccionado, agregarlo
            updatedOptions = [...values, option];
        }

        setSelectedOptions(updatedOptions);

        // Update formData
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: updatedOptions.map(option => ({ id: option.id, name: option.name })),
        }));
    };

    const handleSearchInputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredOptions = options.filter(option =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filteredOptions);
    };

    const handleClick = (event) => {
        if (!disabled) {
            onClick(event, name);
        }
    };

    return (
        <div onClick={handleClick} ref={selectRef} style={{ position: 'relative', display: 'flex', justifyContent: 'start', width: '200px' }}>
            <div
                onClick={toggleOptions}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    flexWrap: 'wrap',
                    cursor: 'pointer',
                }}
            >
                {values.map((option) => (
                    <div
                        key={option.id}
                        style={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '5px',
                            padding: '2px 8px',
                            margin: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.name} <span style={{ marginLeft: '4px' }}>x</span>
                    </div>
                ))}


                <input
                    onClick={(event) => onClick(event, name)}
                    disabled={disabled}
                    autocomplete="off"
                    type="text"
                    name={name}
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    placeholder="Buscar opciones"
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        padding: '8px',
                        borderRadius: '5px',
                    }}
                />
            </div>
            {isOptionsOpen && (
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: '#f1f1f1',
                        minWidth: '100px',
                        borderRadius: '5px',
                        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                        zIndex: 1,
                    }}
                >
                    {filteredOptions.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                backgroundColor: selectedOptions.some(selected => selected.id === option.id)
                                    ? '#ddd'
                                    : 'transparent',
                            }}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
