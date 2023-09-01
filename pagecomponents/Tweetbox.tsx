import React, { FC } from 'react'

const Tweetbox: FC = () => {
  return (
    <div className="flex flex-row justify-between border-b-2 pb-2">
      <div className="profile p-2 m-2">Profile</div>
      <div>
        <div className="textarea bg-black text-white p-2 m-2">
          <textarea
            className="resize-none bg-black outline-none"
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
