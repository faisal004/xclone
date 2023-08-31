import React, { ReactNode } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { AiFillHome, AiFillBell } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';

interface MenuItemProps {
  icon: ReactNode;
  text: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text }) => (
  <div className="flex flex-row p-2 items-center justify-center space-x-1 cursor-pointer hover:bg-slate-700 rounded-xl ">
    <div>{icon}</div>
    <div className="text-center hidden md:block">{text}</div>
  </div>
);

const Sidebar: React.FC = () => {
  return (
    <div className="text-white border-r-2 w-1/4 items-center hidden md:block h-screen">
      <div className="flex justify-center p-3">
        <FaTwitter />
      </div>
      <div className='w-1/2 mx-auto'>
      <MenuItem icon={<AiFillHome />} text="Home" />
      <MenuItem icon={<AiFillBell />} text="Notifications" />
      <MenuItem icon={<CgProfile />} text="Profile" />
      <MenuItem icon={<BiLogOut />} text="Logout" />

      </div>
     

      <div className="w-1/3 pt-2 flex flex-row p-2 items-center justify-center mx-auto">
        <button className="bg-[#2f6eb9] w-full rounded-2xl p-1">Tweet</button>
      </div>
    </div>
  );
};

export default Sidebar;
