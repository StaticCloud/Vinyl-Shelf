import { useState } from 'react';
import { FormWrapper, Form } from '../components/styled-form';
import { Link } from 'react-router-dom'
import { signUp } from '../utils/API';
import Auth from '../utils/auth';

const SignUp = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            if (userFormData.password != userFormData.confirmPassword) {
                throw new Error("Passwords do not match.");
            }

            const response = await signUp(userFormData);

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
            <Form onSubmit={handleFormSubmit}>
                <h1>Sign Up</h1>

                <input name="username"
                    id="username"
                    placeholder="Enter Username..."
                    onChange={handleInputChange}
                    value={userFormData.username} />

                <input name="email"
                    id="email"
                    type="email"
                    placeholder="Enter Email..."
                    onChange={handleInputChange}
                    value={userFormData.email} />

                <input name="password"
                    id="password"
                    type="password"
                    placeholder="Enter Password..."
                    onChange={handleInputChange}
                    value={userFormData.password} />

                <input name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password..."
                    onChange={handleInputChange} />

                <input disabled={
                    !(userFormData.username && userFormData.email && userFormData.password)
                } type="submit" value="Sign Up" />

                <Link to="/login">Or Login</Link>
            </Form>
        </FormWrapper>
    )
}

export default SignUp;