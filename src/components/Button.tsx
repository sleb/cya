import React from "react";

type Props = { type: "button" | "submit"; title: string; onClick?: () => void };

const Button = ({ type, title, onClick }: Props) => {
  return (
    <button
      type={type}
      className="bg-green-700 text-yellow-300 px-2 py-1 w-full rounded-md"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
