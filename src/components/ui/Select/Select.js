import React from 'react';

const Select = ({
    value,
    options,
    className = '',
    name,
    label,
    placeholder = '',
    onChange,

    ...props
}) => {
    return (

        <label htmlFor="" className={`input ${value ? 'modified-input' : ''}`}>
            {label ? label : name} <br />
            <select name={name} onChange={onChange}>
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option} </option>
                ))}
            </select>
        </label>
    );
};

export default Select;
