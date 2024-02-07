import styled from "styled-components";
import { Link } from 'react-router-dom';

const HomeWrapper = styled.div`
    display: flex;
    height: 100svh;
    align-items: center;
    justify-content: center;
`;

const Home = () => {
    return (
        <HomeWrapper>
            <div>
                <h1>Vinyl Shelf</h1>
                <p>Track and share your favorite albums!</p>
                <Link>
                    Start Searching
                </Link>
                <Link>
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