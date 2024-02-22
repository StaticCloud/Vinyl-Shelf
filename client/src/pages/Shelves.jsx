import Auth from '../utils/auth';
import styled from 'styled-components';
import { Link, redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMe } from '../utils/API';
import { ShelfPreview } from '../components/shelfPreview';

const ShelfWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;

    & > a,
    & > a:visited {
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

const ViewSelector = styled.div`
    height: 50px;
    display: flex;
`;

const ViewShelves = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid ${props => props.view === 'shelves' ? props.theme.fg : props.theme.bg};

    &:hover {
        cursor: pointer;
    }
`;

const ViewLikedShelves = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid ${props => props.view === 'shelves' ? props.theme.bg : props.theme.fg};

    &:hover {
        cursor: pointer;
    }
`;

const ShelfView = styled.ul``;

const Collections = () => {
    const [userData, setUserData] = useState({});
    const [view, setView] = useState('shelves');
    const [shelves, setShelves] = useState([]);

    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    window.location.assign('/login')
                }
    
                const response = await getMe(token);
    
                if (!response.ok) {
                    throw new Error('something went wrong!');
                }
    
                const user = await response.json();
  
                setUserData(user);
                setShelves(user.shelf_collection);
            } catch (error) {
                console.error(error);
            }
        }

        getUser();
    }, [userDataLength])

    const handleViewChange = () => {
        if (view === 'shelves') {
            setView('likedShelves')
            setShelves(userData.likes)
        } else {
            setView('shelves')
            setShelves(userData.shelf_collection)
        }
    }

    return (
        <ShelfWrapper>
            <h1>{userData.username}&apos;s Shelves</h1>
            <Link to="/new_shelf">Create Shelf</Link>
            <ViewSelector>
                <ViewShelves onClick={() => handleViewChange()} view={view}>
                    <p>Created Shelves</p>
                </ViewShelves>
                <ViewLikedShelves onClick={() => handleViewChange()} view={view}>
                    <p>Liked Shelves</p>
                </ViewLikedShelves>
            </ViewSelector>
            <ShelfView>
                {shelves.map((shelf, i) => <ShelfPreview key={i} shelf={shelf}/>)}
            </ShelfView>
        </ShelfWrapper>
    );
}

export default Collections;