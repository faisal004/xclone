import React, { ReactNode } from 'react'
import { FaTwitter } from 'react-icons/fa'
import { AiFillHome, AiFillBell } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BiLogOut } from 'react-icons/bi'
import Link from 'next/link'
interface MenuItemProps {
  icon: ReactNode
  text: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text }) => (
  <div className="flex flex-row p-2 items-center space-x-1 cursor-pointer hover:bg-slate-900 rounded-xl  ">
    <div>{icon}</div>
    <div className="text-center hidden md:block">{text}</div>
  </div>
)

const Sidebar: React.FC = () => {
  return (
    <div className="text-white w-1/4 hidden md:block h-screen sticky top-0 ">
      <div className="flex justify-start p-3 ">
        <FaTwitter />
      </div>
      <div className="flex flex-col mx-auto  ">
        <MenuItem icon={<AiFillHome />} text="Home" />
        
        <MenuItem icon={<AiFillBell />} text="Notifications" />
        <Link href={"/Profile"}><MenuItem icon={<CgProfile />} text="Profile" /> </Link>
        
        <MenuItem icon={<BiLogOut />} text="Logout" />
      </div>
      <div className="w-1/3 pt-2 flex flex-row p-2 items-start justify-start ">
        <button className="bg-[#2f6eb9] w-full rounded-2xl p-1">Tweet</button>
      </div>
    </div>
  )
}

export default Sidebar
