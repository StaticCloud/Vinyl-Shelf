import Auth from '../utils/auth';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMe } from '../utils/API';
import { ShelfPreview } from '../components/shelfPreview';
import add_shelf from '../assets/add_shelf.svg';

const ShelvesWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;

    & > h1 {
        font-size: 3rem;
        margin: .8rem 0;
    }

    & > a,
    & > a:visited {
        display: inline-block;
        position: fixed;
        right: 20px;
        bottom: 70px;
        padding: 0.5rem;
        border-radius: 2rem;
        margin: 0.5rem 0;
        color: ${props => props.theme.bg};
        background-color: ${props => props.theme.primary};
    }

    & > a:hover {
        background-color: ${props => props.theme.secondary};
    }
`;

const ViewSelector = styled.div`
    height: 50px;
    display: flex;
`;

const ViewCreatedShelves = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background-color: ${props => props.view === 'shelves' ? props.theme.primary : props.theme.bg};

    &:hover {
        cursor: pointer;
    }
`;

const ViewLikedShelves = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background-color: ${props => props.view === 'shelves' ? props.theme.bg : props.theme.primary};

    &:hover {
        cursor: pointer;
    }
`;

const AddShelf = styled.div`
    width: 40px;
    height: 40px;
    background-position: center;
    background-size: 3rem;
    background-image: url(${add_shelf});
`;

const ShelfView = styled.ul`
    a {
        text-decoration: none;
        color: ${props => props.theme.fg};
    }
`;

const EmptyShelvesWrapper = styled.div`
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        display: flex;
        align-items: center;
    }
`;

const InlineIcon = styled.span`
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 3px;
    background-position: center;
    background-size: 1.8rem;
    background-image: url(${add_shelf});
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
`;

const Collections = () => {
    const [userData, setUserData] = useState({});
    const [view, setView] = useState('shelves');
    const [shelves, setShelves] = useState([]);
    const navigate = useNavigate()

    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    navigate('/login')
                }

                const response = await getMe(token);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
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
        <ShelvesWrapper>
            <p>User profile for:</p>
            <h1>{userData.username}</h1>
            <Link to="/new_shelf">
                <AddShelf />
            </Link>
            <ViewSelector>
                <ViewCreatedShelves onClick={() => handleViewChange()} view={view}>
                    <p>Created Shelves</p>
                </ViewCreatedShelves>
                <ViewLikedShelves onClick={() => handleViewChange()} view={view}>
                    <p>Liked Shelves</p>
                </ViewLikedShelves>
            </ViewSelector>
            {view === "shelves" ? (
                <>
                    {shelves.length ? (
                        <ShelfView>
                            {shelves.map((shelf, i) => <ShelfPreview key={i} shelf={shelf} />)}
                        </ShelfView>
                    ) : (
                        <EmptyShelvesWrapper>
                            <p>You have no shelves. Create a shelf <InlineIcon></InlineIcon> to get started.</p>
                        </EmptyShelvesWrapper>
                    )}
                </>
            ) : (
                <>

                </>
            )}


        </ShelvesWrapper>
    );
}

export default Collections;