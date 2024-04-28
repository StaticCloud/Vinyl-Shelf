import { Link } from "react-router-dom"
import home_light from '../assets/home_light.svg'
import search_light from '../assets/search_light.svg'
import login_light from '../assets/login_light.svg'
import profile_light from '../assets/profile_light.svg'
import logout_light from '../assets/logout_light.svg'
import { NavItem, StyledNav } from "./styled-nav";
import Auth from '../utils/auth';

export const Nav = () => {
    return (
        <StyledNav>
            {!Auth.loggedIn() ? (
                <Link to="/">
                    <NavItem icon={home_light} />
                </Link>
            ) : (
                <></>
            )}
            <Link to="/search">
                <NavItem icon={search_light} />
            </Link>
            {Auth.loggedIn() ? (
                <>
                    <Link to={`/user/${Auth.getProfile().data.id}`}>
                        <NavItem icon={profile_light} />
                    </Link>
                    <Link onClick={Auth.logout}>
                        <NavItem icon={logout_light} />
                    </Link>
                </>
            ) : (
                <Link to="/login">
                    <NavItem icon={login_light} />
                </Link >
            )}

        </StyledNav >
    );
}