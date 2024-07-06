import { Link, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import { useEffect } from "react";
import { HomeWrapper } from '../components/styled-home';

const Home = () => {

    // Create a navigate method from the useNavigate hook.
    const navigate = useNavigate()

    useEffect(() => {
        // On mount, if the user is logged in, redirect them to their profile.
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