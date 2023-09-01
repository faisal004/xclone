"use client"
import React from 'react'
import Tweetbox from '../pagecomponents/Tweetbox'
import Notloginbox from '../pagecomponents/Notloginbox';
import { useRecoilState } from "recoil";
import { userIn } from '@/store/atoms/userIn';

const Middlepage = () => {
  const [user, ] = useRecoilState(userIn);
  console.log(user)
  return (
    <div className='text-white border-l border-r border-l-slate-50 border-r-slate-50  md:w-2/4 w-full  items-center  '>
        <div className='bg-black border-b-2 text-left p-2'>Home</div>
        <div>{user?<Tweetbox/>:
        <Notloginbox/>}</div>
        
    </div>
  )
}

export default Middlepage