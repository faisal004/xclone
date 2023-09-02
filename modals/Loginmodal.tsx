'use client'
import React from 'react'
import { GiCancel } from 'react-icons/gi'
import {signIn,useSession} from "next-auth/react"

interface LoginModalProps {
  closeModal: () => void 
}

const Loginmodal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const {status} =useSession();
  console.log(status)
  return (
    <div className="fixed   -top-10 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-black p-4 rounded-lg h-1/2 w-full md:w-1/4 flex flex-col items-center  space-x-4">
        <div className="flex flex-row justify-between w-full">
          <h2 className="text-white 0">Login Modal</h2>
          <button className="text-white" onClick={closeModal} >
            <GiCancel />
          </button>
        </div>
        <div className=' items-center justify-center w-full py-3 m-3 '>
            <button onClick={()=>{
              signIn("google")
            }} className='bg-orange-700 w-full rounded-xl p-2'>Google</button>
        </div>
      </div>
    </div>
  )
}

export default Loginmodal
