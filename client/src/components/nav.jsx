import styled from "styled-components";
import { Link } from "react-router-dom"
import home_light from '../assets/home_light.svg'
import search_light from '../assets/search_light.svg'
import login_light from '../assets/login_light.svg'

const NavItem = styled.div`
    height: 60px;
    width: 60px;
    background-size: cover;
    background-image: url(${props => props.icon});
`;

const StyledNav = styled.nav`
    position: fixed;
    display: flex;
    width: 100svw;
    height: 60px;
    bottom: 0;
    justify-content: space-evenly;

    a {
        width: 60px;
        display: block;
    }
`;

export const Nav = () => {
    return (
        <StyledNav>
            <Link to="/">
                <NavItem icon={home_light}>

                </NavItem>
            </Link>
            <Link to="/search">
                <NavItem icon={search_light}>
                    
                </NavItem>
            </Link>
            <Link to="/login">
                <NavItem icon={login_light}>
                    
                </NavItem>
            </Link>
        </StyledNav>
    );
}