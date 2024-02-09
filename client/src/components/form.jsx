import styled from "styled-components";

export const StyledForm = styled.form`
    width: 300px;

    h1 {
        margin-bottom: 2rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        display: block;
        border-bottom: 2px solid ${props => props.theme.fg};
        background-color: ${props => props.theme.bg};
        color: ${props => props.theme.fg};
        padding: 0.3rem;
        margin-bottom: 2rem;
        outline: none;
        width: 100%;
    }

    input[type="submit"] {
        font-weight: bold;
        padding: 0.5rem;
        border-radius: 2rem;
        color: ${props => props.theme.bg};
        background-color: ${props => props.theme.fg};
        margin-bottom: 0;
    }

    input[type="submit"]:hover {
        cursor: pointer;
    }
`;