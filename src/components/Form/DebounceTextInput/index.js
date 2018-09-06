import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import InputWrapper from '../InputWrapper';

import './style.css';


export default function DebounceTextInput(props) {
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
            <DebounceInput
                {...inputProps}
                ref={inputRef}
                className="debounce-input"
            />
        </InputWrapper>
    );
}

