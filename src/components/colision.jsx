import React, { useState } from 'react';
import '../styles/discoli.css';

function Collapsible(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="collapsible-container">
      <div className="collapsible-header" onClick={toggleExpanded}>
        {props.header}
        <div className={`collapsible-arrow ${isExpanded ? 'expanded' : ''}`} />
      </div>
      {isExpanded && <div className="collapsible-content">{props.children}</div>}
    </div>
  );
}

export default Collapsible;