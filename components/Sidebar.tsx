import React, { ReactNode, useState } from 'react'
import { FaTwitter } from 'react-icons/fa'
import { AiFillHome, AiFillBell } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BiLogOut, BiLogInCircle } from 'react-icons/bi'
import { signOut, useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import Loginmodal from '@/modals/Loginmodal'


interface MenuItemProps {
  icon: ReactNode
  text: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text }) => (
  <div className="flex flex-row p-2 items-center space-x-1 cursor-pointer hover:bg-slate-900 rounded-xl">
    <div>{icon}</div>
    <div className="text-center hidden md:block">{text}</div>
  </div>
)

const Sidebar: React.FC = () => {
  const { data: session } = useSession()
 

  const handleLogout = async () => {
    await signOut()
  }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="text-white w-1/4 hidden md:block h-screen sticky top-0">
      <div className="flex justify-start p-3">
        <Link href="/">
          {' '}
          <FaTwitter />
        </Link>
      </div>
      <div className="flex flex-col mx-auto">
        <Link href="/">
          {' '}
          <MenuItem icon={<AiFillHome />} text="Home" />{' '}
        </Link>

        <MenuItem icon={<AiFillBell />} text="Notifications" />
        <Link href="/Profile">
          <MenuItem icon={<CgProfile />} text="Profile" />{' '}
        </Link>
        {session ? (
          <div
            className="flex flex-row p-2 items-center space-x-1 cursor-pointer hover:bg-slate-900 rounded-xl"
            onClick={handleLogout}
          >
            <div>
              <BiLogOut />
            </div>
            <div className="text-center hidden md:block">Logout</div>
          </div>
        ) : (
          <div
            className="flex flex-row p-2 items-center space-x-1 cursor-pointer hover:bg-slate-900 rounded-xl"
            onClick={openModal}
          >
            <div>
              <BiLogInCircle />
            </div>
            <div className="text-center hidden md:block">Login</div>
          </div>
        )}
      </div>
      <div className="w-1/3 pt-2 flex flex-row p-2 items-start justify-start">
        <button className="bg-[#2f6eb9] w-full rounded-2xl p-1">Tweet</button>
      </div>
      {isModalOpen && <Loginmodal closeModal={closeModal} />}
    </div>
  )
}

export default Sidebar
