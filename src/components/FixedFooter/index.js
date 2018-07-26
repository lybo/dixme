import React from 'react';
import './style.css';

function FixedFooter({
  children,
}) {
  return (
    <div className="fixed-footer">
      {children}
    </div>
  );
}

export default FixedFooter;
