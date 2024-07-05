import { FormWrapper, Form } from '../components/styled-form';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { login } from '../utils/API';
import Auth from '../utils/auth';
import { Alert } from '../components/Alert';

const Login = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const [popup, setPopup] = useState({
        visible: false,
        text: ''
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await login(userFormData);

            if (!response.ok) {
                triggerPopup('Something went wrong!')
                throw new Error('Something went wrong!');
            }

            const { token } = await response.json();
            Auth.login(token);
        } catch (error) {
            console.error(error);
        }
    }

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
                        !(userFormData.email && userFormData.password)
                    } type="submit" value="Login" />

                    <Link to="/signup">Or Sign Up</Link>
                </Form>
            </FormWrapper>
        </>
    );
}

export default Login;