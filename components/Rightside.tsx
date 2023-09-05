import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Rightside = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/getAllUser');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.userDetails);
          setLoading(false);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="text-white w-1/4 items-center hidden md:block">
      <div className="bg-slate-700 text-center p-2 m-2 rounded-2xl">
        <div className="p-2 text-lg font-medium">People you may Know</div>
        {status === 'authenticated' ? (
          !loading ? (
            users.map((user) => (
              <div
                className="flex flex-row space-x-2 bg-slate-600 rounded-xl m-1"
                key={user.id}
              >
                <div className="profile p-2 ">
                  <Image
                    src={user.image}
                    alt="Profile photo"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                </div>
                <div className="name p-2">{user.name}</div>
              </div>
            ))
          ) : (
            'Loading ...'
          )
        ) : (
          'Please log in to see users'
        )}
      </div>
    </div>
  );
};

export default Rightside;
