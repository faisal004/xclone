'use client'
import React, { useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import { signIn, useSession } from 'next-auth/react'

interface SignupmodalProps {
  closeSignupModal: () => void
}

const Signupmodal: React.FC<SignupmodalProps> = ({ closeSignupModal }) => {
  const { status } = useSession()
  console.log(status)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userExist = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })
      const userExistsData = await userExist.json()

      if (userExistsData.message == 'User Exists') {
        console.log('User with this email already exists.')
        return
      }

      const response = await fetch('api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (response.ok) {
        console.log('Done')
        await signIn('credentials', {
          email,
          password,
        })
      } else {
        console.log('Not Done')
      }
    } catch (error) {
      console.error(error)
    }

    setName('')
    setEmail('')
    setPassword('')

    closeSignupModal()
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-black p-4 rounded-lg w-full md:w-2/4 flex flex-col items-center h-fit space-x-4">
        <div className="flex flex-row justify-between w-full">
          <h2 className="text-white">Signup Modal</h2>
          <button className="text-white" onClick={closeSignupModal}>
            <GiCancel />
          </button>
        </div>

        <div className="items-center justify-center w-full py-3 m-3 ">
          <button
            onClick={() => {
              signIn('google')
            }}
            className="bg-orange-700 w-full rounded-xl p-2"
          >
            Google
          </button>
        </div>
        <div className="text-white m-2 p-2">OR</div>
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
              type="text"
              placeholder="Username"
              className="bg-black text-white p-2 rounded-xl"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
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

export default Signupmodal
