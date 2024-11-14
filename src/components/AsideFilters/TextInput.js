import React from 'react';

const TextInput = ({ name, value, title, handleInputChange }) => {
    return (
        <label className={`input ${value ? 'modified-input' : ''}`}>
            {`${title} (${name})`}: <br />
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
            />
        </label>
    );
}

export default TextInput;