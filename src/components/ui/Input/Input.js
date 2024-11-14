import React from 'react';

const Input = ({
    value,
    className = '',
    type = 'text',
    name,
    label,
    placeholder = '',
    onChange,
    onKeyDown,

    ...props
}) => {
    return (
        <label className={`input ${value ? 'modified-input' : ''}`}>
            {label ? label : name} <br />
            <input
                value={value}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </label>
    );
};

export default Input;
