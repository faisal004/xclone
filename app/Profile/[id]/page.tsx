'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import UserTweets from '@/pagecomponents/UserTweets'
import Navabar from '@/components/Navabar'

const page = ({ params }: { params: { id: string } }) => {
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true); 
  console.log(userDetails)

  function decodeEmail(encodedEmail: any) {
    return encodedEmail.replace(/%40/g, '@')
  }
  const encodedEmail = params?.id
  const decodedEmail = decodeEmail(encodedEmail)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: decodedEmail }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user details')
        }

        const data = await response.json()

        setUserDetails(data.userDetails)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="text-white border-l border-r border-l-slate-50 border-r-slate-50 md:w-2/4 w-full items-center">
        <Navabar/>
      <div className="bg-black border-b-2 text-left p-2 text-xl font-medium">
        Profile
      </div>
       <div className="p-2">
        {!loading?(  <div className="flex items-center space-x-4 mt-3">
            <div className="relative w-16 h-16 ">
              <Image
                src={userDetails?.image}
                alt="User Profile"
                height={100}
                width={100}
                className="rounded-full"
                priority={false}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userDetails?.name}</h2>
              <p className="text-gray-300">{userDetails?.email}</p>
            </div>
          </div>):"Loading..."}
        

        <div className='mt-10 border-t-2' >
            <div className=' border-b-2 text-center text-xl mb-4' >All Tweets </div>
            
            {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <UserTweets userEmail={userDetails?.email} />
          )}
         
        </div>
        </div>
      
    </div>
  )
}

export default page
