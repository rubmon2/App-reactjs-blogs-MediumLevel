import React from 'react';

export const InputForm = ({ valuesInput }) => {
  const { state, onInputChange } = valuesInput;
  return (
    <div>
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="Insert Email"
          value={state.email}
          name="email"
          onChange={onInputChange}
        ></input>
      </div>

      <div>
        <label>password</label>
        <input
          type="password"
          placeholder="Insert Password"
          value={state.password}
          name="password"
          onChange={onInputChange}
        ></input>
      </div>
    </div>
  );
};
