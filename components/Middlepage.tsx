'use client'
import React from 'react'
import Tweetbox from '@/pagecomponents/Tweetbox'
import Notloginbox from '@/pagecomponents/Notloginbox'
import { useRecoilState } from 'recoil'
import { userIn } from '@/store/atoms/userIn'
import { useSession } from 'next-auth/react'
import AllTweet from '@/pagecomponents/AllTweet'
import Navabar from './Navabar'

const Middlepage = () => {
  const [user] = useRecoilState(userIn)
  const { data, status } = useSession()

  return (
    <div className="text-white border-l border-r border-l-slate-50 border-r-slate-50  md:w-2/4 w-full  items-center  ">
    <Navabar/>
    <div className='Home bg-black border-b-2 text-left p-2 text-xl font-semibold'>Home</div>
      <div>
        {status === 'authenticated' ? (
          <>
            <Tweetbox />
            <AllTweet />
          </>
        ) : (
          <Notloginbox />
        )}
      </div>
    </div>
  )
}

export default Middlepage
