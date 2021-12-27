import React from "react";

export type Props = { title: string };

const Header = ({ title }: Props) => {
  return (
    <header className="bg-white shadow mb-8">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-green-900">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
