import React from 'react';
import InputWrapper from '../InputWrapper';

import './style.css';


export default function TextInput(props) {
    const {
        inputRef = () => {},
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
            <input
                {...inputProps}
                id={inputId}
                ref={inputRef}
                className="text-input"
            />
        </InputWrapper>
    );
}
