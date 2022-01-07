import React, { ChangeEventHandler } from "react";

type Props = {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: () => void;
  error?: string;
  secure?: boolean;
};

const TextInput = (props: Props) => {
  return (
    <div className="flex flex-col h-10 mb-2">
      <input
        className={`w-full rounded-md px-2 border ${
          props.error && "bg-red-100 placeholder-red-300 ring-red-500 ring-1"
        }`}
        type={props.secure ? "password" : "text"}
        placeholder={props.placeholder}
        autoCapitalize="none"
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <span className="px-2 text-red-500 text-xs">{props.error}</span>
    </div>
  );
};

export default TextInput;
