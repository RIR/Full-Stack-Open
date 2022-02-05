import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Maybe not the cleanest solution to place the
// context here, but not creating a new structure
// just for this now.
export const TogglableContext = React.createContext();
TogglableContext.displayName = 'TogglableContext';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <TogglableContext.Provider value={() => setVisible(!visible)}>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </TogglableContext.Provider>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
