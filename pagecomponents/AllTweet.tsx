import React, { useState, useEffect } from 'react';


function timeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const timeDiff = now - then;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 1) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  }

const AllTweet = () => {
  const [tweets, setTweets] = useState([]);
  console.log(tweets);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAllTweets');
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();

        if (data) {
          const tweetsWithFormattedTime = data.allTweet.map((tweet) => ({
            ...tweet,
            formattedCreatedAt: timeAgo(tweet.createdAt), 
          }));
          setTweets(tweetsWithFormattedTime.reverse());
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchData();
    const pollInterval = 3000; 
    const intervalId = setInterval(fetchData, pollInterval);

   
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      {tweets.map((tweet) => (
        <div
          key={tweet._id}
          className="bg-black p-4 rounded-sm shadow-md border-b-2"
        >
          <div className="flex">
            <div className="mr-3">
              <img
                src={tweet.userPhoto}
                alt="User Photo"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <div className="font-bold">{tweet.userName}</div>
            </div>
          </div>
          <div className="mt-2 p-2">{tweet.tweet}</div>
          <div className="text-end text-xs text-slate-300">
            {tweet.formattedCreatedAt} {/* Display formatted time */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTweet;
