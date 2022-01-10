import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  invert?: boolean;
}

const normal = "bg-green-700 text-white";
const inverted = "border-green-700 border text-green-700";

const Button = ({ invert = false, children, ...props }: Props) => {
  return (
    <button
      className={`${invert ? inverted : normal} px-2 py-1 w-full rounded-md`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
