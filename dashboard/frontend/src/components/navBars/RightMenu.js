import React from 'react';

const RightMenu = ({ MenuData, setActiveComponent, activeComponent }) => {
  return (
    <div className={`ui fluid three item menu`}>
      {MenuData.map((item, i) => {
        return (
          <div
            className={`item ${
              activeComponent === MenuData.indexOf(item) ? 'active' : ''
            }`}
            onClick={() => setActiveComponent(MenuData.indexOf(item))}
            key={i}
            id="RightMenu"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default RightMenu;
