import React from 'react';
import InputWrapper from '../InputWrapper';

import './style.css';


export default function TextareaInput(props) {
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
      <textarea
        {...inputProps}
        id={inputId}
        ref={inputRef}
        className="textarea-input"
      ></textarea>
    </InputWrapper>
  );
}

