import Auth from '../utils/auth';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../utils/API';
import { ShelfPreview } from '../components/shelfPreview';
import { Loading } from '../components/loading';
import add_shelf from '../assets/add_shelf.svg';
import search from '../assets/search_light.svg';

const ShelvesWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;

    & > h1 {
        font-size: 3rem;
    }

    & > a,
    & > a:visited {
        display: block;
        width: 30px;
        height: 30px;
        margin-bottom: 1rem;
    }
`;

const ViewSelector = styled.div`
    display: flex;
`;

const ViewShelves = styled.div`
    display: flex;
    padding: 10px 20px;
    margin: 0 5px 5px 0;
    align-items: center;
    justify-content: center;
    border-radius: 50px;

    &:hover {
        cursor: pointer;
    }
`

const ViewCreatedShelves = styled(ViewShelves)`
    background-color: ${props => props.view === 'shelves' ? props.theme.primary : props.theme.secondary};
`;

const ViewLikedShelves = styled(ViewShelves)`
    background-color: ${props => props.view === 'shelves' ? props.theme.secondary : props.theme.primary};
`;

const AddShelf = styled.div`
    width: 30px;
    height: 30px;
    background-position: center;
    background-size: 2rem;
    background-image: url(${add_shelf});
    background-color: ${props => props.theme.primary};
    border-radius: 50px;

    &:hover {
        background-color: ${props => props.theme.secondary};
    }
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
    background-image: url(${props => props.icon});
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
`;

const Collections = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [view, setView] = useState('shelves');
    const [shelves, setShelves] = useState([]);
    const [likedShelves, setLikedShelves] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUserOnMount = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    navigate('/login')
                }

                const response = await getUser({ token: token, id: id });

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const user = await response.json();

                setUserData(user);
                setShelves(user.shelf_collection);
                setLikedShelves(user.likes)
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        getUserOnMount();
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
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}

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
                            <p>You have no shelves. Create a shelf <InlineIcon icon={add_shelf}></InlineIcon> to get started.</p>
                        </EmptyShelvesWrapper>
                    )}
                </>
            ) : (
                <>
                    {likedShelves.length ? (
                        <ShelfView>
                            {likedShelves.map((likedShelf, i) => <ShelfPreview key={i} shelf={likedShelf.shelf} />)}
                        </ShelfView>
                    ) : (
                        <EmptyShelvesWrapper>
                            <p>You have no liked shelves. Search <InlineIcon icon={search}></InlineIcon> for shelves to get started.</p>
                        </EmptyShelvesWrapper>
                    )}
                </>
            )}
        </ShelvesWrapper>
    );
}

export default Collections;