import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const FormField = ({ label, type, register, errors }) => (
    <div>
        <label>{label}:</label>
        <input type={type} {...register(label.toLowerCase(), { required: `${label} is required`})} />
        {errors[label.toLowerCase()] && <p>{errors[label.toLowerCase()].message}</p>}
    </div>
);

const LoginPage = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async(data) => {
        setLoading(true);
        setErrorMessage('');
        try {
            console.log('Form Data Submitted:', data);
            const response = await API.post('auth/login', data);
            console.log('Response:', response);
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/dashboard');
            } else {
                throw new Error('Token not Received');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setErrorMessage(error.response?.data?.message || 'Email or Password Incorrect');
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <h1>Login</h1>
            <form onSubmit={
                handleSubmit(onSubmit)
            }>
                <FormField label="Email" type="email" register={register} errors={errors} />
                <FormField label="Password" type="password" register={register} errors={errors} />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in.." : 'Login'}
                </button>
                { errorMessage && <p>{errorMessage}</p>}
            </form>
        </>
    )
}

export default LoginPage;