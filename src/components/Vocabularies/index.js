import React, { Component } from 'react';
import './style.css';

class Vocabularies extends Component {
    render() {
        return (
            <div className="Vovabularies">
                {this.props.vocabularies.map(vocabulary => <div key={vocabulary.id}>{vocabulary.title}</div>)}
            </div>
        );
    }
}

export default Vocabularies;
