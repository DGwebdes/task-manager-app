import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/formPage.css'
import { useState } from 'react';

const FormField = ({ label, type, register, errors }) => {
    const fieldName = label.toLowerCase();
    return (
        <>
            <div className='form-field'>
                <label>{label}:</label>
                <input type={type} {...register(fieldName, { required: `${label} is required`})} />
            </div>
            <div className="error-message">
                {errors[fieldName] && <p>{errors[fieldName].message}</p>}
            </div>
        </>
    );
};

const LoginPage = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const { login, loading } = useAuthContext();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async(data) => {
        try {
            await login(data);
            navigate('/task-manager-app/dashboard');
        } catch (error) {
            console.error('Error occurred:', error);
            setErrorMessage(Error === 'Invalid credentials' ? 'User not Found' : 'Unable to login');
        }
    };

    return (
        <main>
            <div className='form-wrapper'>
                <h1>Login</h1>
                <form onSubmit={
                    handleSubmit(onSubmit)
                }>
                    <FormField label="Email" type="email" register={register} errors={errors} />
                    <FormField label="Password" type="password" register={register} errors={errors} />
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in.." : 'Login'}
                    </button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </div>
            <button onClick={() => navigate('/task-manager-app/register')}>Register</button>
        </main>
    )
}

export default LoginPage;