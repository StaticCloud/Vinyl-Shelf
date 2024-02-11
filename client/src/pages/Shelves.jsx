import Auth from '../utils/auth';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMe } from '../utils/API';

const ShelfWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;

    a,
    a:visited {
        display: inline-block;
        font-weight: bold;
        font-size: 0.9rem;
        text-decoration: none;
        padding: 0.5rem;
        border-radius: 2rem;
        margin: 0.5rem 0;
        color: ${props => props.theme.bg};
        background-color: ${props => props.theme.fg};
    }
`;

const Collections = () => {
    const [userData, setUserData] = useState({});

    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
    
                if (!token) {
                    return false;
                }
    
                const response = await getMe(token);
    
                if (!response.ok) {
                    throw new Error('something went wrong!');
                }
    
                const user = await response.json();
                setUserData(user);
            } catch (error) {
                console.error(error);
            }
        }
    
        getUser();
    }, [userDataLength])

    return (
        <ShelfWrapper>
            <h1>{userData.username}&apos;s Collections</h1>
            <Link to="/new_shelf">Create Shelf</Link>
        </ShelfWrapper>
    );
}

export default Collections;