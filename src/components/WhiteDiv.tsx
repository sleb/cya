import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const WhiteDiv = ({ children, ...props }: Props) => {
  return (
    <div className="text-sm bg-white shadow p-2 rounded-md mb-2" {...props}>
      {children}
    </div>
  );
};

export default WhiteDiv;
