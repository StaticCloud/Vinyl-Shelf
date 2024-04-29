import Auth from '../utils/auth';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../utils/API';
import { ShelfPreview } from '../components/ShelfPreview';
import { Loading } from '../components/Loading';
import add_shelf from '../assets/add_shelf.svg';
import search from '../assets/search_light.svg';
import ToggleableButton from '../components/styled-button/ToggleableButton';
import { ListItem, UnorderedList } from '../components/styled-list';
import { ProfileHeader, CreateShelf, EmptyShelves, InlineIcon } from '../components/styled-profile-page';
import { ToggleWrapper } from '../components/styled-search';

const Profile = () => {
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
        <>
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}
            <ProfileHeader>
                <p>User profile for:</p>
                <h1>{userData.username}</h1>
                <Link to="/new_shelf">
                    <CreateShelf />
                </Link>
            </ProfileHeader>
            <ToggleWrapper>
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
            </ToggleWrapper>
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
                        <EmptyShelves>
                            <p>You have no shelves. Create a shelf <InlineIcon icon={add_shelf}></InlineIcon> to get started.</p>
                        </EmptyShelves>
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
                        <EmptyShelves>
                            <p>You have no liked shelves. Search <InlineIcon icon={search}></InlineIcon> for shelves to get started.</p>
                        </EmptyShelves>
                    )}
                </>
            )}
        </>
    );
}

export default Profile;