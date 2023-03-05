import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users/user');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      Welcome, {user.username}!
    </div>
  );
};

export default UserDetails;
