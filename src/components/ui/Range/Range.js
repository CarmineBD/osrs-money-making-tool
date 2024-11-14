import React from 'react';

const Range = ({
    minValue,
    maxValue,
    className = '',
    name,
    label,
    onChange,
    onKeyDown,

    ...props
}) => {
    return (
        <div style={{ marginTop: '1rem' }}>
            <label className={`input ${minValue || maxValue ? 'modified-input' : ''}`} >
                {label ? label : name} <br />

                <div style={{ display: 'flex' }}>

                    <input type="text" size='8' placeholder='min' name='min_creation_date' value={minValue} onChange={onChange} onKeyDown={onKeyDown} />
                    <input type="text" size='8' placeholder='max' name='max_creation_date' value={maxValue} onChange={onChange} onKeyDown={onKeyDown} />

                </div>
            </label>
        </div>
    );
};

export default Range;
