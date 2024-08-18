import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';

const StaffRegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        gender: '',
        address: '',
        i_d: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('http://localhost:8000/app01/register/staff/', {
            user: {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                user_type: 2,
            },
            gender: formData.gender,
            address: formData.address,
            i_d: formData.i_d,
            phone: formData.phone,
        })
        .then(response => {
            toast.success('Staff registered successfully!');
            // console.log(response.data);
            // Handle successful registration
        })
        .catch(error => {
            if (error.response && error.response.data) {
                toast.error(`Error: ${error.response.data}`);
            } else {
                toast.error('An unexpected error occurred.');
            }
            // console.error(error.response.data);
            // Handle registration error
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="text" name="i_d" placeholder="ID" onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
            <button type="submit">Register Staff</button>
        </form>
    );
};

export default StaffRegistrationForm;
