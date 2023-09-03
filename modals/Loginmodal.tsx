'use client'
import React,{useState} from 'react'
import { GiCancel } from 'react-icons/gi'
import { signIn, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { userIn } from '@/store/atoms/userIn'

interface LoginModalProps {
  closeModal: () => void
}

const Loginmodal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setuser] = useRecoilState(userIn)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false, 
      });

      if (response && response.error) {
        console.error(response.error);
      } else {
  console.log("Done Buddt")
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed   -top-10 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-black p-4 rounded-lg h-fit w-full md:w-1/4 flex flex-col items-center  space-x-4">
        <div className="flex flex-row justify-between w-full">
          <h2 className="text-white 0">Login Modal</h2>
          <button className="text-white" onClick={closeModal}>
            <GiCancel />
          </button>
        </div>

        <div className=" items-center justify-center w-full py-3 m-3 ">
          <button
            onClick={() => {
              signIn('google')
            }}
            className="bg-orange-700 w-full rounded-xl p-2"
          >
            Google
          </button>
        </div>
        <div>OR</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4 m-2 w-fit ">
            <input
              type="text"
              placeholder="Email"
              className="bg-black text-white p-2 rounded-xl "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
            />
      
            <input
              type="password"
              placeholder="Password"
              className="bg-black text-white p-2 rounded-xl"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required
            />
            <button type="submit" className="bg-orange-700 rounded-xl p-1">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Loginmodal
