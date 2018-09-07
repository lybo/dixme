import React from 'react';
import ReactTagsInput from 'react-tagsinput'
import InputWrapper from '../InputWrapper';

import './style.css';


export default function TagsInput(props) {
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
      <div
        className="tags-input"
      >
        <ReactTagsInput
          {...inputProps}
          id={inputId}
          ref={inputRef}
          addOnBlur
          addOnPaste
        />
      </div>
    </InputWrapper>
  );
}


