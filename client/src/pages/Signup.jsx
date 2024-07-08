import { useState } from 'react';
import { FormWrapper, Form } from '../components/styled-form';
import { Link } from 'react-router-dom'
import { signUp } from '../utils/API';
import Auth from '../utils/auth';
import Alert from '../components/Alert';

const SignUp = () => {
    // State hook for form data.
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

    // Event listener function for changing form data.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Manages status of popup.
    const [popup, setPopup] = useState({
        visible: false,
        text: ''
    });

    // Functionality for handling form submission.
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            // Ensure the password and the confirmed passwords match.
            if (userFormData.password != userFormData.confirmPassword) {
                triggerPopup('Passwords do not match.')
                throw new Error("Passwords do not match.");
            }

            // Attempt to make an API call for creating a user using the form data.
            const response = await signUp(userFormData);

            // Throw an error is something goes wrong.
            if (!response.ok) {
                triggerPopup('Something went wrong!')
                throw new Error('Something went wrong!');
            }

            // Obtain token from response.
            const { token } = await response.json();
            Auth.login(token);
        } catch (error) {
            console.error(error);
        }
    }

    // Manage popup.
    const triggerPopup = (text) => {
        setPopup({
            visible: true,
            text: text
        })

        setTimeout(() => {
            setPopup({
                ...popup,
                visible: false
            })
        }, 5000)
    }

    return (
        <>
            {/* Conditionally render popup. */}
            {popup.visible ? (
                <Alert text={popup.text}></Alert>
            ) : (
                <></>
            )}

            <FormWrapper>
                <Form onSubmit={handleFormSubmit}>
                    <h1>Sign Up</h1>

                    <input name="username"
                        id="username"
                        maxLength={20}
                        placeholder="Enter Username"
                        onChange={handleInputChange}
                        value={userFormData.username} />

                    <input name="email"
                        id="email"
                        type="email"
                        maxLength={50}
                        placeholder="Enter Email"
                        onChange={handleInputChange}
                        value={userFormData.email} />

                    <input name="password"
                        id="password"
                        type="password"
                        maxLength={16}
                        placeholder="Enter Password"
                        onChange={handleInputChange}
                        value={userFormData.password} />

                    <input name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleInputChange} />

                    {/* Disable submit button if all form inputs are null. */}
                    <input disabled={
                        !(userFormData.username && userFormData.email && userFormData.password)
                    } type="submit" value="Sign Up" />

                    <Link to="/login">Or Login</Link>
                </Form>
            </FormWrapper>
        </>
    )
}

export default SignUp;