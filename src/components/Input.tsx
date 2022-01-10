import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  align?: "left" | "center" | "right";
}

const Input = React.forwardRef(
  (
    { error, align = "left", ...props }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col h-10 mb-2">
        <input
          ref={ref}
          className={`text-${align} w-full rounded-md px-2 border ${
            error && "bg-red-100 placeholder-red-300 ring-red-500 ring-1"
          }`}
          {...props}
        />
        <span className="px-2 text-red-500 text-xs">{error}</span>
      </div>
    );
  }
);

export default Input;
