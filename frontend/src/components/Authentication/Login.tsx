import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { toast } from 'react-toastify';
import api from '../../api';


const Login = () => {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/login/', formData)  // Adjust the path if needed
        .then(response => {
            navigate('/verify-otp', { state: { userId: response.data.user_id } });
            toast.success('Login Successful');
        })
        .catch(error => {
            if (error.response && error.response.data) {
                toast.error(`Login failed: ${error.response.data}`);
            } else {
                toast.error('Invalid credentials. Please try again.');
            }
        });
  };

  const currentYear = new Date().getFullYear();

  return (
    
    <div className='flex flex-col login-page'>

      <div className="login-container">
        <div className="login-section1">
          <div className="login-flex-item">
            <p>Enter Your Credentials To Log In To <span>System</span> </p>
            <img src="/src/assets/react.svg" alt="logo" />
          </div>

          <div className="login-flex-item1">
            <img src="/src/assets/login1.png" alt="logo-icon" />
          </div>
        </div>

        <div className="login-form">  
                 
          <form onSubmit={handleSubmit}>
            <input  type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange} required />
            <input type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange} required />
            <button type="submit">Login</button>
            <div className="options">
                <a href="#">Forgot Password?</a>
                <a href="#">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
        
      <div className="login-footer flex flex-row justify-between">
        <p className="py-1">&copy; {currentYear} All rights reserved.</p><span className="py-1">V<b>1.0</b></span>
      </div>
        
    </div>
  )
}

export default Login


