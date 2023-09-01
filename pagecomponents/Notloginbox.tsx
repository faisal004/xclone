import React, { FC } from 'react'

const Notloginbox: FC = () => {
  return (
    <div className="flex flex-col justify-between border-b-2 pb-2 text-center space-y-8">
     <div className='mx-auto mt-10'>Welcome to Twitter Or X .Please login to continue</div>
     <div className='space-x-3'>
        <button className='bg-[#2f6eb9] px-3 py-1 rounded-xl '>Login</button>
        <button className='bg-[#2f6eb9]  px-3 py-1 rounded-xl '>Signup</button>
     </div>
      
    </div>
  )
}

export default Notloginbox
