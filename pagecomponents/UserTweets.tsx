import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface UserTweetsProps {
    userEmail: string; 
  }

interface Tweet {
  _id: string;
  userEmail: string;
  userPhoto: string;
  userName: string;
  createdAt: string; 
  tweet: string;
  formattedCreatedAt?: string;
}

function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const timeDiff = now.getTime() - then.getTime();
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

const UserTweets: React.FC<UserTweetsProps> = ({userEmail }) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getUserTweets', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ userEmail:userEmail }),
          });
        if (!response.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const data = await response.json();
        console.log(data)

        if (data) {
          const tweetsWithFormattedTime = data.userTweets.map((tweet: Tweet) => ({
            ...tweet,
            formattedCreatedAt: timeAgo(tweet.createdAt),
          }));
          setTweets(tweetsWithFormattedTime.reverse());
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setLoading(false);
      }
    };

    fetchData();
    const pollInterval = 30000;
    const intervalId = setInterval(fetchData, pollInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        tweets.map((tweet) => (
          <div
            key={tweet._id}
            className="bg-black p-4 rounded-sm shadow-md border-b-2"
          >
            <div className="flex">
              <div className="mr-3">
                <Link href={`/Profile/${tweet.userEmail}`}>
                  <img
                    src={tweet.userPhoto}
                    alt="User Photo"
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              </div>
              <div>
                <div className="font-bold">{tweet.userName}</div>
              </div>
            </div>
            <div className="mt-2 p-2">{tweet.tweet}</div>
            <div className="text-end text-xs text-slate-300">
              {tweet.formattedCreatedAt}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserTweets;
