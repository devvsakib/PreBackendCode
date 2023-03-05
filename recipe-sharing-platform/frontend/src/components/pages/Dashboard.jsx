import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Dashboard(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  function onLogout() {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
  useEffect(() => {
    async function fetchUser() {
      const user = localStorage.getItem('user');
      if (!user) {
        // Redirect to login page if token is not present
        props.history.push('/login');
        return;
      }
      

      try {
        // Send a request to the protected route
        const userData = JSON.parse(user);
        
        setUser(userData);
        setLoading(false);
      } catch (err) {
        // Redirect to login page if server responds with error
        props.history.push('/login');
      }
    }
    fetchUser();
  }, [props.history]);

  if (loading) {
    return <div>Login first</div>;
  }

  return (
    <div className='text-left w-2/3 mx-auto my-10 text-2xl'>
      <h1>Username: {user.username}</h1>
      <h1>Email: {user.email}</h1>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
