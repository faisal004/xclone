import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineHome } from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi'
import { useSession ,signOut} from 'next-auth/react'
import Link from 'next/link'
const Navabar = () => {
    const { data, status } = useSession()
    const handleLogout = async () => {
        await signOut()
      }
  return (
    <div className="bg-black border-b-2 text-left p-2 flex flex-row space-x-6 md:hidden">
    <Link href={'/'}>
      {' '}
      <div className="home flex flex-row items-center ">
        <AiOutlineHome className="m-1" />
        Home
      </div>
    </Link>
    <Link href={`/Profile/${data?.user?.email}`}>
      <div className="profile flex flex-row items-center md:hidden">
        <CgProfile className="m-1" />
        Profile
      </div>
    </Link>
{status==="unauthenticated"? null:( <div className="logout flex flex-row items-center md:hidden"     onClick={handleLogout}>
      <BiLogOutCircle className="m-1" />
      Logout
    </div>)}
   
  </div>
  )
}

export default Navabar