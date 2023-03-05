import { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/signup', { username, email, password });
      window.location = '/login';
      console.log(response.data);
      // handle successful signup
    } catch (err) {
      console.error(err.response.data);
      // handle error
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupForm;
