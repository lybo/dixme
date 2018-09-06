import React from 'react';

import './style.css';


export default function InputWrapper(props) {
    const {
        label,
        id,
        children,
    } = props;

    return (
        <div>
            <label
                className="input-wrapper__label"
                htmlFor={id}
            >
                {label}
            </label>
            <div
                className="input-wrapper__input"
            >
                {children}
            </div>
        </div>
    );
}

