import { useState } from 'react';
import styled from 'styled-components';
import { StyledForm } from "../components/form";
import { Link } from 'react-router-dom'
import { signUp } from '../utils/API';

const SignUpFormWrapper = styled.div`
    text-align: center;
    width: 100vw;
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;

    a,
    a:visited {
        color: ${props => props.theme.fg};
        text-decoration: none;
        display: inline-block;
        border-bottom: 1px solid ${props => props.theme.fg};
        margin: 1rem;
    }
`;

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

            const { token, user } = await response.json();
            console.log(token, user);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SignUpFormWrapper>
            <StyledForm onSubmit={handleFormSubmit}>
                <h1>Sign Up</h1>

                <input name="username"
                    id="username"
                    placeholder="Enter Username..."
                    onChange={handleInputChange}
                    value={userFormData.username} />

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

                <input name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password..."
                    onChange={handleInputChange} />

                <input disabled={
                    !(userFormData.username && userFormData.email && userFormData.password)
                } type="submit" value="Sign Up" />

                <Link to="/login">Or Login</Link>
            </StyledForm>
        </SignUpFormWrapper>
    )
}

export default SignUp;