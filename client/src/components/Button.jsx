import React from 'react';

const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button; 