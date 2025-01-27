import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import API from '../services/api';
import schema from '../services/schemaRegister.js';
import '../styles/formPage.css'

const FormField = ({ label, type, register, errors }) => {
    const fieldName = label.toLowerCase().replace(' ', '');
    return (
        <>
            <div>
                <label>{label}:</label>
                <input type={type} {...register(
                    fieldName === 'email' ? 'email' : fieldName,
                    { required : `${label} is required`}
                )} />
            </div>
            <div className="error-message">
            {errors[fieldName] && <p>{errors[fieldName].message}</p>}
            </div>
        </>
)};


const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) =>{
        setLoading(true);
        setErrorMessage('');
        try {
            console.log("Registration data:", data);
            const response = await API.post('/auth/register', data);
            console.log(response);
            alert('Registration Successfull. Please Login');
            navigate('/');
        } catch (error) {
            console.log("error:", error);
            setErrorMessage(error.response?.data?.message ||
                (error.message === 'Network Error' ? 'Unable to connect to the server.' : 'An unexpected error occurred.'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <div className='form-wrapper'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField label="Username" name="username" type="text" register={register} errors={errors} />
                    <FormField label="Email" name="email" type="email" register={register} errors={errors} />
                    <FormField label="Password" name="password" type="password" register={register} errors={errors} />
                    <FormField label="Confirm Password" name="confirmpassword" type="password" register={register} errors={errors} />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </div>
        </main>
    )
}

export default RegisterPage;