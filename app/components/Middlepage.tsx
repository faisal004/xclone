"use client"
import React ,{useState}from 'react'
import Tweetbox from '../pagecomponents/Tweetbox'
import Notloginbox from '../pagecomponents/Notloginbox';

const Middlepage = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className='text-white border-l border-r border-l-slate-50 border-r-slate-50  md:w-2/4 w-full  items-center overflow-x-auto '>
        <div className='bg-black border-b-2 text-left p-2'>Home</div>
        <div>{login?<Tweetbox/>:
        <Notloginbox/>}</div>
        
    </div>
  )
}

export default Middlepage