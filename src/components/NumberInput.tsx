import React, { ChangeEventHandler } from "react";

type Props = {
  placeholder: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: () => void;
  min: number;
  max: number;
  error?: string;
};

const NumberInput = ({ error, ...props }: Props) => {
  return (
    <div className="flex flex-col h-10 mb-2">
      <input
        type="number"
        className={`w-full rounded-md px-2 border ${
          error && "bg-red-100 placeholder-red-300 ring-red-500 ring-1"
        }`}
        {...props}
      />
      <span className="px-2 text-red-500 text-xs">{error}</span>
    </div>
  );
};

export default NumberInput;
