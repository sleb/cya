import React from "react";

type Props = {
  type: "button" | "submit";
  title: string;
  onClick?: () => void;
  invert?: boolean;
  disabled?: boolean;
};

const normal = "bg-green-700 text-white";
const inverted = "border-green-700 border text-green-700";

const Button = ({
  type,
  title,
  onClick,
  invert = false,
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      className={`${invert ? inverted : normal} px-2 py-1 w-full rounded-md`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
