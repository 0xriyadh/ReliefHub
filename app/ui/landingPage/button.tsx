import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  isActive: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isActive }) => {
  return (
    <button
      className={`rounded ${isActive
        ? 'bg-orange-400 text-white  hover:bg-orange-500'
        : 'bg-transparent text-black  hover:bg-orange-400'
        } px-4 py-1`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
