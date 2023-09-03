import React, { FC } from 'react'
import  {useSession} from "next-auth/react"
import Image from 'next/image'
import {CgProfile} from "react-icons/cg"

const Tweetbox: FC = () => {
  const {data:session}=useSession()
  console.log(session?.user?.image)
  return (
    <div className="flex flex-row justify-between border-b-2 pb-2">
      <div className='rounded-full p-2 m-2 text-2xl'>
        {session?.user?.image ?(<Image className='rounded-full' src={session?.user?.image} alt="sd" height={50} width={50}></Image>):(<CgProfile className=""/>)}
      


      </div>
      
      <div>
        <div className="textarea bg-black text-white p-2 m-2">
          <textarea
            className="resize-none bg-black outline-none w-11/12"
            name="name"
            cols={70}
            rows={5}
            placeholder="What's Happening"
          ></textarea>
        </div>
        <div className="button flex items-end justify-end">
          <button className='bg-[#2f6eb9] px-2 py-1 rounded-xl mx-4'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default Tweetbox
