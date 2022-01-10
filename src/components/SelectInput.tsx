import React from "react";

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
  error?: string;
}

const SelectInput = React.forwardRef(
  ({ error, children, ...props }: Props, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <div className="flex flex-col h-10 mb-2">
        <select
          className={`w-full rounded-md px-2 border ${
            error && "bg-red-100 placeholder-red-300 ring-red-500 ring-1"
          }`}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <span className="px-2 text-red-500 text-xs">{error}</span>
      </div>
    );
  }
);

export default SelectInput;
