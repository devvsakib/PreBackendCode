import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the login endpoint with the email and password
      const res = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });

      // Store the JWT token in local storage
      localStorage.setItem('token', res.data.token);
      console.log('Token set:', res.data.token);

      // Redirect the user to the home page
      if (res.status === 200) {
        console.log('Login successful');
        const response = await axios.get(`http://localhost:5000/users/`);
        // const userData = await response.json();
        // console.log(userData);
        response.data.map((user) => {
          if (user.email === email) {
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User set:', user);
          }
        });
        window.location = '/dashboard';
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log(email, password)
  return (
    <div>
      <div class="w-full max-w-xs mx-auto my-10">
        <form class="bg-white/20 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">
              Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder="Username" />
          </div>
          <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="******************" />

          </div>
          <div class="flex items-center justify-between">
            {

            }
            <Link to='/dashboard'>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                Sign In
              </button>
            </Link>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
