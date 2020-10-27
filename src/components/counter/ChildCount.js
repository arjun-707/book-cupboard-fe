import React from 'react'
import Button from '@material-ui/core/Button';

function ChildCount({ increment, decrement }) {
  return (
    <div className="parent-counter">
      <label>Child</label>
      <Button variant="contained" color="primary" onClick={increment}>
        Increment
      </Button>
      <Button variant="contained" color="primary" onClick={decrement}>
        Decrement
      </Button>
    </div>
  );
}
export default ChildCount