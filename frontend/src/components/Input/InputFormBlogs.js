import React from 'react';

export const InputFormBlogs = ({
  label,
  type,
  name,
  onInputOnchange,
  value,
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        placeholder={name}
        value={value}
        name={name}
        onChange={onInputOnchange}
      ></input>
    </div>
  );
};
