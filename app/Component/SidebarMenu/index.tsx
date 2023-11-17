'use client'

import React from 'react';
import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiFillHome, AiOutlineUser, AiFillBell } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import Link from 'next/link';



const SideBar = () => {
  const menus = [
    { name: 'Home', link: '/graphPage', icon: AiFillHome },
    { name: 'Driver List', link: '/uploadedDocuments', icon: AiOutlineUser },
    { name: 'Profile', link: '/profile', icon: AiFillBell },
    { name: 'Logout', link: '/settings', icon: HiOutlineLogout },
  ];
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-amber-600 min-h-screen ${
          open ? 'w-72' : 'w-16'
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={24}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex items-center justify-center my-20">
          <div className="text-center">
            <img
              src="/images/logoTruck.png"
              alt="Profile"
              className="lg:w-20 mx-auto mb-4 sm:w-10 sm:mb-2"
            />
          </div>
        </div>

        <div className="my-8 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <Link href={menu.link} key={i}>
              <div
                className={`group flex items-center text-xl gap-8 font-medium p-4 mt-4 hover:bg-gray-500 rounded-md`}
              >
                <div>{React.createElement(menu.icon, { size: '20' })}</div>
                <h2
                  className={`duration-500 ${
                    !open && 'opacity-0 translate-x-28 overflow-hidden'
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`${
                    open && 'hidden'
                  } absolute left-48 bg-amber-600 font-semibold text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideBar;


