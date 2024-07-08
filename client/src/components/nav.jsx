import { Link } from "react-router-dom"
import home from '../assets/home.svg'
import search from '../assets/search.svg'
import login from '../assets/login.svg'
import profile from '../assets/profile.svg'
import logout from '../assets/logout.svg'
import { NavItem, StyledNav } from "./styled-nav";
import Auth from '../utils/auth';

const Nav = () => {
    return (
        <StyledNav>
            {!Auth.loggedIn() ? (
                <Link to="/">
                    <NavItem icon={home} />
                </Link>
            ) : (
                <></>
            )}
            <Link to="/search">
                <NavItem icon={search} />
            </Link>
            {Auth.loggedIn() ? (
                <>
                    <Link to={`/user/${Auth.getProfile().data.id}`}>
                        <NavItem icon={profile} />
                    </Link>
                    <Link onClick={Auth.logout}>
                        <NavItem icon={logout} />
                    </Link>
                </>
            ) : (
                <Link to="/login">
                    <NavItem icon={login} />
                </Link >
            )}

        </StyledNav >
    );
}

export default Nav;