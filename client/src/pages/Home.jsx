import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import { useEffect } from "react";

const HomeWrapper = styled.div`
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

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (Auth.loggedIn()) {
            navigate(`/user/${Auth.getProfile().data.id}`)
        }
    }, [])

    return (
        <HomeWrapper>
            <div>
                <h1>Vinyl Shelf</h1>
                <p>Track and share your favorite albums!</p>
                <Link to="/login">
                    Login
                </Link>
                <Link to="/signup">
                    Sign Up
                </Link>
            </div>
        </HomeWrapper>
    );
}

export default Home;