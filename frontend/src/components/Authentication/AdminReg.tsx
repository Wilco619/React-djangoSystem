import { useState } from 'react';
import api from '../../api';

const AdminRegistrationForm = () => {
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
        api.post('http://localhost:8000/app01/register/admin/', {
            user: {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                user_type: 1,
            },
            gender: formData.gender,
            address: formData.address,
            i_d: formData.i_d,
            phone: formData.phone,
        })
        .then(response => {
            console.log(response.data);
            // Handle successful registration
        })
        .catch(error => {
            console.error(error.response.data);
            // Handle registration error
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <input type="text" name="i_d" placeholder="ID" onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                <button type="submit">Register Admin</button>
            </form>
            
        </div>
    );
};

export default AdminRegistrationForm;
