import React, { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Tweetbox: FC = () => {
  const { data: session } = useSession();
  const notify = () => {
    

    toast.success("Tweeted !", {
      position: toast.POSITION.TOP_CENTER
    });}
  const email = session?.user?.email;
  const username=session?.user?.name;
 
  const photo=session?.user?.image;
 
  const [tweet, setTweet] = useState('');
  const [userId, setUserId] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tweet.trim() === '') {
      return;
    }
    try {
      const response = await fetch('/api/postTweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify({userEmail:email,userName:username,userPhoto:photo,tweet:tweet}), 
      });
  // const data= await response.json()

      if (response.ok) {
        console.log('Tweet posted successfully');
        notify()
       
      } else {
        console.error('Error posting tweet');
       
      }
    } catch (error) {
      console.error('An error occurred while posting tweet:', error);
   
    }

    

    setTweet('');
  };

  return (
    <div className="flex flex-row justify-between border-b-2 pb-2">
      <div className="rounded-full p-2 m-2 text-2xl">
      <ToastContainer />
       
        {session?.user?.image ? (
           <Link href={`/Profile/${session?.user?.email}`}>
            <Image
            className="rounded-full"
            src={session?.user?.image}
            alt="sd"
            height={50}
            width={50}
          />
        
           </Link>
         
        ) : (
          <CgProfile className="" />
        )}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="textarea bg-black text-white p-2 m-2">
            <textarea
              className="resize-none bg-black outline-none w-11/12"
              name="name"
              cols={70}
              rows={5}
              placeholder="What's Happening"
              maxLength={240}
              value={tweet}
              onChange={(e) => {
                setTweet(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="button flex items-end justify-end">
            <button
              type="submit"
              className={`bg-[#377ed4] px-2 py-1 rounded-xl mx-4 ${
                tweet.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={tweet.trim() === ''}
             
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tweetbox;
