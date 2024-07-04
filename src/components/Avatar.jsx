import React, { useState, useEffect, useRef } from 'react';
import LogoutButton from "./LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react";

const AvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth0();


  useEffect(() => {
    const handleScroll = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('click', handleClickOutside);
    };
}, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    {/* <div>{JSON.stringify(user)}</div> */}
    {user?.picture && (<div className="relative mx-5" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          className="w-8 h-8 rounded-full"
          src={user?.picture}
          alt="Avatar"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 text-nowrap mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            <div className="block px-4 py-2 text-sm text-gray-700 ">
              Hi, {user?.name || user?.email}
            </div>
            <hr className="border-gray-200" />

            <LogoutButton />
          </div>
        </div>
      )}
    </div>)}
    </>
  );
};

export default AvatarDropdown;
