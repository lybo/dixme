import React from 'react';
import InputWrapper from '../InputWrapper';

import './style.css';


export default function SelectInput(props) {
    const {
        inputRef = () => {},
        options,
        emptyOptionText,
        ...inputProps,
    } = props;
    const {
        id,
        label,
    } = props;
    const inputId = `input-${id}`;
    return (
        <InputWrapper
            id={inputId}
            label={label}
        >
            <select
                {...inputProps}
                id={inputId}
                ref={inputRef}
                className="select-input"
            >
                {emptyOptionText && (
                    <option value="">{emptyOptionText}</option>
                )}
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </InputWrapper>
    );
}
