import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import "./Login.css"
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {  username, password });

      localStorage.setItem('token', response.data);

      const decodedToken:{role:number} = jwtDecode(response.data);
      console.log(decodedToken);
      
      if (response.status === 200 && decodedToken.role === 10) {
        navigate('/client');
      } else if (response.status === 200 && decodedToken.role === 5) {
        navigate('/dashboard');
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.log('Error:', error);
    }
    
  };

  return (
    <div  className="login">
      <h1 className="login-title">Login</h1>
      <div className="login-form">
      <label className="login-form-input">
        User:
        <input  type="text" value={username}  placeholder='username' onChange={(e) => setUser(e.target.value)} />
      </label>
      <label className="login-form-input">
        Password:
        <input  type="text" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
      </label>
      </div>
      <button className='login-form-button' onClick={handleLogin}>ingresar</button>
    </div>
  );
};

export default Login;
