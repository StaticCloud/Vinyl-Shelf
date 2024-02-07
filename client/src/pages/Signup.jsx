import styled from 'styled-components';
import { StyledForm } from "../components/form";
import { Link } from 'react-router-dom'

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
    return (
        <SignUpFormWrapper>
            <StyledForm>
                <h1>Sign Up</h1>

                <input name="username" id="username" placeholder="Enter Username..."/>

                <input name="email" id="email" placeholder="Enter Email..."/>

                <input name="password" id="password" placeholder="Enter Password..."/>

                <input name="confirmPassword" id="confirmPassword" placeholder="Confirm Password..."/>

                <input type="submit" value="Sign Up"/>

                <Link to="/login">Or Login</Link>
            </StyledForm>
        </SignUpFormWrapper>
    )
}

export default SignUp;