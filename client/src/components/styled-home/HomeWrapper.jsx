import styled from "styled-components";

export const HomeWrapper = styled.div`
    display: flex;
    height: 100svh;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1 {
        font-size: 4rem;
    }

    p {
        margin-bottom: 2rem;
    }

    a {
        width: 300px;
        margin: 0 auto;
        display: block;
        font-weight: bold;
        font-size: 0.9rem;
        text-decoration: none;
        padding: 0.5rem;
        border-radius: 2rem;
        margin-bottom: 0.5rem;
        color: ${props => props.theme.bg};
        background-color: ${props => props.theme.fg};
    }
`;