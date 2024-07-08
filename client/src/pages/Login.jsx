import { FormWrapper, Form } from '../components/styled-form';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { login } from '../utils/API';
import Auth from '../utils/auth';
import Alert from '../components/Alert';

const Login = () => {
    // Set the state of the form data to be empty strings.
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

    // Handler for user inputs in the form.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update the state object when the user changes their data in the form.
        setUserFormData({ ...userFormData, [name]: value });
    };

    // Set the default properties for the popup.
    const [popup, setPopup] = useState({
        visible: false,
        text: ''
    });

    // Handler for form submission when logging in.
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            // Send the data from the form to our API.
            const response = await login(userFormData);

            if (!response.ok) {
                // Trigger our popup with a warning message and throw an error.
                triggerPopup('Something went wrong!')
                throw new Error('Something went wrong!');
            }

            // Obtain the token from the API and save it to local storage.
            const { token } = await response.json();
            Auth.login(token);
        } catch (error) {
            console.error(error);
        }
    }

    // Function for handling popups.
    const triggerPopup = (text) => {
        // Set the state of the popup to be visible, and pass in the text argument.
        setPopup({
            visible: true,
            text: text
        })

        // After five seconds, set the popup to be invisible.
        setTimeout(() => {
            setPopup({
                ...popup,
                visible: false
            })
        }, 5000)
    }

    return (
        <>
            {/* If the status of the popup is visible, mount the alert component */}
            {popup.visible === true ? (
                <Alert text={popup.text}></Alert>
            ) : (
                <></>
            )}
            <FormWrapper>
                <Form onSubmit={handleFormSubmit}>
                    <h1>Login</h1>

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

                    <input disabled={
                        // If the input fields for the email and password are empty, disable the submit button.
                        !(userFormData.email && userFormData.password)
                    } type="submit" value="Login" />

                    <Link to="/signup">Or Sign Up</Link>
                </Form>
            </FormWrapper>
        </>
    );
}

export default Login;