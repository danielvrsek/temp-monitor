import React from 'react';

const MidContentDisplay = ({ MidData, activeComponent }) => {
  return (
    <div>
      {MidData.filter(
        (component) => MidData.indexOf(component) === activeComponent
      ).map((component, i) => {
        return <div key={i}>{component}</div>;
      })}
    </div>
  );
};

export default MidContentDisplay;
