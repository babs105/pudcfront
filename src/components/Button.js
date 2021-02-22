import React from "react";

const classes = {
  buttonStyle: (primary, large) =>
    `rounded-full shadow-lg text-white  focus:outline-none
     ${
       primary && large
         ? " py-2 px-10 bg-indigo-500 hover:bg-indigo-900"
         : " py-1 px-4  bg-indigo-400 hover:bg-indigo-600"
     }`,
};
export const Button = ({ primary, large, children, type, onClick }) => {
  return (
    <button
      className={classes.buttonStyle(primary, large)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
export default Button;
