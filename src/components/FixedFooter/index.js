import React from 'react';
import './style.css';

class FixedFooter extends React.Component {
  componentWillMount() {
    window.addEventListener('touchend', this.redraw, false);
  }

  componentWillUnmount() {
    window.addEventListener('touchend', this.redraw, false);
  }

  redraw = () => {
    if (!this.el || !this.el.children || !this.el.children[0]) {
      return;
    }

    this.el.replaceChild(this.el.children[0], this.el.children[0]);
  }

  render() {
    return (
      <div
        className="fixed-footer"
        ref={el => {
          this.el = el;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FixedFooter;
