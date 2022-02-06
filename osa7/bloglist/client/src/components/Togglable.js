import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

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
      <div style={{margin: '10px 0px'}}>
        <div style={hideWhenVisible}>
          <Button variant='outlined' onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <Button variant='outlined' onClick={toggleVisibility}>cancel</Button>
        </div>
      </div>
    </TogglableContext.Provider>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;

