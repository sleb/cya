import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../images/cya.jpg";
import { User } from "../model/user";
import LogOutButton from "./LogOutButton";
import MenuButton from "./MenuButton";
type Props = { user: User };

const NavBar = ({ user }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={logo} alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/dashboard"
                  className="bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <LogOutButton user={user} />
            </div>
          </div>
          <MenuButton
            menuOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/dashboard"
            className="bg-green-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-3">
            <LogOutButton user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
