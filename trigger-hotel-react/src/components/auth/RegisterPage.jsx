import React from 'react'
import { useState } from 'react'
import APIService from '../../service/APIService'
import { useNavigate, Link } from 'react-router-dom'


const RegisterPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setErrorMessage('All fields are required');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        try {
            const response = await APIService.register(formData);

            if (response.status === 200) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    }

  return (
    <div className="auth-containter">
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number: </label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default RegisterPage