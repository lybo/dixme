import React, { Component } from 'react';
import { ReadmeSearch } from 'react-scripts-webextension';
import './Search.css';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      query: event.currentTarget.value
    });
  }

  render() {
    return (
      <div className="Search">
        <div className="bar">
          22222:
          <input
            type="search"
            placeholder="Search the User Guide"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </div>
        <ReadmeSearch query={this.state.query} />
      </div>
    );
  }
}
