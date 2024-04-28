import styled from "styled-components";

export const NavItem = styled.div`
    height: 60px;
    width: 60px;
    background-size: 3rem;
    background-position: center;
    background-image: url(${props => props.icon});
`;