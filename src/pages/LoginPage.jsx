import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FormField = ({ label, type, register, errors }) => {
    const fieldName = label.toLowerCase();
    return (
        <div>
            <label>{label}:</label>
            <input type={type} {...register(fieldName, { required: `${label} is required`})} />
            {errors[fieldName] && <p>{errors[fieldName].message}</p>}
        </div>
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
            </form>
        </>
    )
}

export default LoginPage;