import Auth from '../utils/auth';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../utils/API';
import { ShelfPreview } from '../components/ShelfPreview';
import { Loading } from '../components/Loading';
import add_shelf from '../assets/add_shelf.svg';
import search from '../assets/search_light.svg';
import ToggleableButton from '../components/ToggleableButton';
import { ListItem, UnorderedList } from '../components/styled-list';

const ProfileWrapper = styled.section`
    margin: 0 auto;
`;

const HeaderWrapper = styled.div`
    padding: 2rem 2rem 0 2rem;
    margin-bottom: 1rem;

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
    margin-bottom: 2rem;
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
    const [shelves, setShelves] = useState([]);
    const [likedShelves, setLikedShelves] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const [filter, setFilter] = useState({
        createdShelves: true,
        likedShelves: false
    })

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

    return (
        <ProfileWrapper>
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}
            <HeaderWrapper>
                <p>User profile for:</p>
                <h1>{userData.username}</h1>
                <Link to="/new_shelf">
                    <AddShelf />
                </Link>
                <ViewSelector>
                    <ToggleableButton 
                        selected={filter.createdShelves}
                        onClick={() => setFilter({
                            createdShelves: true,
                            likedShelves: false
                        })}>
                        <p>Created Shelves</p>
                    </ToggleableButton>
                    <ToggleableButton 
                        selected={filter.likedShelves}
                        onClick={() => setFilter({
                            createdShelves: false,
                            likedShelves: true
                        })}>
                        <p>Liked Shelves</p>
                    </ToggleableButton>

                </ViewSelector>
            </HeaderWrapper>
            {filter.createdShelves === true ? (
                <>
                    {shelves.length ? (
                        <UnorderedList>
                            {shelves.map((shelf, i) => (
                                <ListItem key={i}>
                                    <ShelfPreview shelf={shelf} />
                                </ListItem>)
                            )}
                        </UnorderedList>
                    ) : (
                        <EmptyShelvesWrapper>
                            <p>You have no shelves. Create a shelf <InlineIcon icon={add_shelf}></InlineIcon> to get started.</p>
                        </EmptyShelvesWrapper>
                    )}
                </>
            ) : (
                <>
                    {likedShelves.length ? (
                        <UnorderedList>
                            {likedShelves.map((likedShelf, i) => (
                                <ListItem key={i}>
                                    <ShelfPreview shelf={likedShelf.shelf} />
                                </ListItem>)
                            )}
                        </UnorderedList>
                    ) : (
                        <EmptyShelvesWrapper>
                            <p>You have no liked shelves. Search <InlineIcon icon={search}></InlineIcon> for shelves to get started.</p>
                        </EmptyShelvesWrapper>
                    )}
                </>
            )}
        </ProfileWrapper>
    );
}

export default Collections;