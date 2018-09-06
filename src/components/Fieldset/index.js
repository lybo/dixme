import React from 'react';
import './style.css';

export default function Fieldset(props) {
    const {
        title,
        fieldsetLegendClassName,
        fieldsetContentClassName,
        children,
    } = props;
    return (
        <fieldset className="fieldset">
            <legend
                className={`fieldset__legend ${fieldsetLegendClassName}`}
            >
                {title}
            </legend>
            <div className={`fieldset__content ${fieldsetContentClassName}`}>
                {children}
            </div>
        </fieldset>
    );
}
