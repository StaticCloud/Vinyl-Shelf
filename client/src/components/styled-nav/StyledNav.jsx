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
`;