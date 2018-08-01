import React from 'react';
import './style.css';

class FixedFooter extends React.Component {
  state = {
    hide: false,
  }

  lastKnownScrollPosition = 0
  ticking = false

  componentWillMount() {
    window.addEventListener('touchend', this.redraw, false);
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('touchend', this.redraw, false);
    window.removeEventListener('scroll', this.handleScroll, false);
    this.ticking = false;
    this.lastKnownScrollPosition = 0;
  }

  redraw = () => {
    if (!this.el || !this.el.children || !this.el.children[0]) {
      return;
    }

    this.el.replaceChild(this.el.children[0], this.el.children[0]);
  }

  handleScroll = (e) => {
    const {
      byPassScrolling,
    } = this.props;
    if (byPassScrolling) {
      return;
    }

    const hide = window.scrollY - this.lastKnownScrollPosition >= 0;
    this.lastKnownScrollPosition = window.scrollY;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.setState({
          hide,
        });
        this.ticking = false;
      });

      this.ticking = true;
    }
  }

  render() {
    const {
      hide,
    } = this.state;
    const {
      byPassScrolling,
    } = this.props;
    return (
      <div
        className={`fixed-footer ${hide && !byPassScrolling ? 'fixed-footer--hide' : ''}`}
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
