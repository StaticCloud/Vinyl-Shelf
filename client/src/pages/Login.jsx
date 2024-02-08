import { FormWrapper } from '../components/formWrapper';
import { StyledForm } from '../components/form';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { login } from '../utils/API';
import Auth from '../utils/auth';

const Login = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await login(userFormData);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const { token } = await response.json();
            Auth.login(token);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleFormSubmit}>
                <h1>Login</h1>

                <input name="email"
                    id="email"
                    placeholder="Enter Email..."
                    onChange={handleInputChange}
                    value={userFormData.email} />

                <input name="password"
                    id="password"
                    placeholder="Enter Password..."
                    onChange={handleInputChange}
                    value={userFormData.password} />

                <input disabled={
                    !(userFormData.email && userFormData.password)
                } type="submit" value="Login" />

                <Link to="/signup">Or Sign Up</Link>
            </StyledForm>
        </FormWrapper>
    );
}

export default Login;