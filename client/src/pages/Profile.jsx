import Auth from '../utils/auth';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../utils/API';
import { ShelfPreview } from '../components/ShelfPreview.jsx';
import { Loading } from '../components/Loading';
import add_shelf from '../assets/add_shelf.svg';
import search from '../assets/search.svg';
import ToggleableButton from '../components/styled-button/ToggleableButton';
import { ListItem, UnorderedList } from '../components/styled-list';
import { ProfileHeader, CreateShelf, EmptyShelves, InlineIcon } from '../components/styled-profile-page';
import { ToggleWrapper } from '../components/styled-search';
import { Alert } from '../components/Alert';

const Profile = () => {
    // Get the user ID from the URL.
    const { id } = useParams();

    // Get any query parameters.
    const [params] = useSearchParams();

    // Separate states for user data, created shelves, and liked shelves.
    const [userData, setUserData] = useState({});
    const [shelves, setShelves] = useState([]);
    const [likedShelves, setLikedShelves] = useState([])

    // State that captures when API data is being loaded.
    const [loading, setLoading] = useState(true)

    // Create a navigate object using the navigate hook.
    const navigate = useNavigate()

    // State object that handles which shelf list the user is currently viewing.
    const [filter, setFilter] = useState({
        createdShelves: true,
        likedShelves: false
    })

    // State that manages popup info.
    const [popup, setPopup] = useState({
        visible: false,
        text: ''
    });

    // Use the total number of all keys in our userData object as a reactive variable when loading the user data.
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        // Depending on our query parameter...

        // Render a popup for a successful or unsuccessful shelf addition.
        if (params.get("add-success") === "true") {
            triggerPopup('Shelf successfully added!')
        } else if (params.get("add-success") === "false") {
            triggerPopup('Shelf could not be created.')
        }

        // Render a popup for a successful or unsuccessful shelf deletion.
        if (params.get("delete-success") === "true") {
            triggerPopup('Shelf successfully deleted!')
        } else if (params.get("add-success") === "false") {
            triggerPopup('Shelf could not be deleted.')
        }

        // Our asynchronous API that obtains user data.
        const getUserOnMount = async () => {
            try {
                // Get the authenticated user (if given).
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                // If the user is not authenticated, redirect them to the login page.
                if (!token) {
                    navigate('/login')
                }

                // Get the user data using the token and the ID from our endpoint.
                const response = await getUser({ token: token, id: id });

                // Throw an error if the request was not successful.
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                // Parse our response.
                const user = await response.json();

                // Update our state hooks
                setUserData(user);
                setShelves(user.shelf_collection);
                setLikedShelves(user.likes)

                // Set the loading state hook to false since we have retrieved the necessary data.
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        // Call our asynchronous function.
        getUserOnMount();

    // Our effect hook will be invoked on mount and when the userDataLength variable changes.
    }, [userDataLength])

    // Function for managing popups.
    const triggerPopup = (text) => {
        setPopup({
            visible: true,
            text: text
        })

        setTimeout(() => {
            setPopup({
                ...popup,
                visible: false
            })
        }, 5000)
    }

    return (
        <>
            {/* Conditional rendering of the loading component depending on the state of the loading state hook. */}
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}

            {/* Conditional rendering of the popup. */}
            {popup.visible ? (
                <Alert text={popup.text}></Alert>
            ) : (
                <></>
            )}
            <ProfileHeader>
                <p>User profile for:</p>
                <h1>{userData.username}</h1>
                <Link to="/new-shelf">
                    <CreateShelf />
                </Link>
            </ProfileHeader>
            <ToggleWrapper>
                {/* Button that displays created shelves when pressed. */}
                <ToggleableButton
                    selected={filter.createdShelves}
                    onClick={() => setFilter({
                        createdShelves: true,
                        likedShelves: false
                    })}>
                    <p>Created Shelves</p>
                </ToggleableButton>
                {/* Button that shows liked shelves when pressed. */}
                <ToggleableButton
                    selected={filter.likedShelves}
                    onClick={() => setFilter({
                        createdShelves: false,
                        likedShelves: true
                    })}>
                    <p>Liked Shelves</p>
                </ToggleableButton>
            </ToggleWrapper>
            {/* Conditional statement that either renders the list for created shelves or liked shelves. */}
            {filter.createdShelves === true ? (
                <>
                    {/* Render list of created shelves. */}
                    {shelves.length ? (
                        <UnorderedList>
                            {shelves.map((shelf, i) => (
                                <ListItem key={i}>
                                    <ShelfPreview shelf={shelf} />
                                </ListItem>)
                            )}
                        </UnorderedList>
                    ) : (
                        <EmptyShelves height={"calc(100svh - 319px)"}>
                            <p>You have no shelves. Create a shelf <InlineIcon icon={add_shelf}></InlineIcon> to get started.</p>
                        </EmptyShelves>
                    )}
                </>
            ) : (
                <>
                    {/* Render list of liked shelves. */}
                    {likedShelves.length ? (
                        <UnorderedList>
                            {likedShelves.map((likedShelf, i) => (
                                <ListItem key={i}>
                                    <ShelfPreview shelf={likedShelf.shelf} />
                                </ListItem>)
                            )}
                        </UnorderedList>
                    ) : (
                        <EmptyShelves height={"calc(100svh - 319px)"}>
                            <p>You have no liked shelves. Search <InlineIcon icon={search}></InlineIcon> for shelves to get started.</p>
                        </EmptyShelves>
                    )}
                </>
            )}
        </>
    );
}

export default Profile;