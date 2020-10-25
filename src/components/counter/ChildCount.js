import React from 'react'


function ChildCount({ increment, decrement }) {
  return (
    <div className="parent-counter">
      <label>Child</label>
      <button onClick={increment}>Child Increment</button>
      <button onClick={decrement}>Child Decrement</button>
    </div>
  );
}
export default ChildCount