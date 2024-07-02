import styled from "styled-components";

export const StyledNav = styled.nav`
    position: fixed;
    background-color: ${props => props.theme.primary};
    display: flex;
    width: 100svw;
    height: 60px;
    bottom: 0;
    z-index: 2;
    justify-content: space-evenly;

    a {
        width: 60px;
        display: block;
    }

    @media screen and (min-width: 768px) { 
        height: 100vh;
        width: 60px;
        flex-direction: column;
        justify-content: start;
    }
`;