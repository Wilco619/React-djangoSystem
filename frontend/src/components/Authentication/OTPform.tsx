import "./Login.css";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../../api";

const OTPform = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;  // Access userId from location state

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/verify-otp/', { otp, user_id: userId })
      .then(response => {
        // Save token to local storage
        localStorage.setItem('token', response.data.token);
        
        // Redirect based on user type
        if (response.data.user_type === 1) {
          navigate('/admin/dashboard'); // Redirect to admin dashboard
        } else if (response.data.user_type === 2) {
          navigate('/staff/dashboard'); // Redirect to staff dashboard
        } else {
          navigate('/home/'); // Fallback to a common home page
        }
      })
      .catch(error => {
        setError('OTP verification failed. Please try again.');
        console.error('OTP verification failed:', error.response?.data || error);
      });
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <div className="login-section1">
          <div className="login-flex-item">
            <p>Please Enter Your OTP to continue to <span>System</span></p>
          </div>
          <div className="login-flex-item1">
            <img src="/src/assets/login1.png" alt="logo-icon" />
          </div>
        </div>

        <div className='login-form'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        </div> 
      </div>
    </div>
  )
}

export default OTPform;





