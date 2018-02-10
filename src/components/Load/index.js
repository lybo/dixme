import React, { Component } from 'react';
import './style.css';

export default function Load() {
    return (
        <div className="load">
            <div className="spinner" />
            <div className="load__label">Loading</div>
        </div>
    );
}
