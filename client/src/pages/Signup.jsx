import { StyledForm } from "../components/form";

const SignUp = () => {
    return (
        <StyledForm>
            <label htmlFor="username"></label>
            <input name="username" id="username"></input>
        </StyledForm>
    )
}

export default SignUp;