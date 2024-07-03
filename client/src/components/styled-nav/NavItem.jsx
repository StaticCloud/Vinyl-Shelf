import styled from "styled-components";

export const NavItem = styled.div`
    height: 60px;
    width: 60px;
    background-size: 2.8rem;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props => props.icon});

    @media screen and (min-width: 768px) { 
        background-size: 2.5rem; 
    }
`;