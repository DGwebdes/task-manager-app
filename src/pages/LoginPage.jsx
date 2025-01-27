import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/formPage.css'

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

    const onSubmit = async(data) => {
        try {
            await login(data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error occurred:', error);
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
                </form>
            </div>
        </main>
    )
}

export default LoginPage;