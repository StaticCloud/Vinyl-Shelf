import { useParams, Link, useNavigate } from "react-router-dom";
import { getShelf, removeFromShelf, likeShelf, deleteLike, updateShelf } from "../utils/API";
import { useEffect, useState } from "react";
import trash from '../assets/trash.svg';
import like from '../assets/like.svg';
import Auth from "../utils/auth";
import { ConfirmDelete } from "../components/ConfirmDelete";
import search from '../assets/search.svg';
import share from '../assets/share.svg'
import edit from '../assets/edit.svg'
import { Loading } from "../components/Loading";
import { Alert } from "../components/Alert";
import { LoadingMini } from "../components/styled-loading";
import { UnorderedList, ListItem } from "../components/styled-list";
import { VinylInfo, Cover } from "../components/styled-vinyl";
import { ShelfHeader, TotalLikes, SettingsTab, SettingsButton, LikeButton, DeleteVinyl, TitleEditor, TitleEditorButtonWrapper, TitleEditorButton } from "../components/styled-shelf-page";
import { EmptyShelves, InlineIcon } from "../components/styled-profile-page";

const Shelf = () => {
    // Destructure the URL and obtain the ID of the shelf.
    const { id } = useParams();

    // Create a navigate object using the navigate hook.
    const navigate = useNavigate()

    // Set loading states for the shelf data, as well as writing likes, edits, and deletions to the database.
    const [loading, setLoading] = useState(true);
    const [loadingLike, setLoadingLike] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDeleteVinyl, setLoadingDeleteVinyl] = useState(false);

    // Store shelf data in a state variable.
    const [shelfData, setShelfData] = useState([]);
    const [popup, setPopup] = useState({
        visible: false,
        text: ''
    });

    // Check if shelf was liked by the authenticated user.
    const [isLiked, setIsLiked] = useState('false');

    // Manage the state of the confirm delete popup.
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    // Store total number of likes in a state variable.
    const [totalLikes, setTotalLikes] = useState(0);

    // Manage whether or not the shelf is being edited.
    const [editing, setEditing] = useState(false);

    // 
    const [editedTitle, setEditedTitle] = useState('');

    const shelfDataLength = Object.keys(shelfData).length;

    useEffect(() => {
        // Makes an API call to Postgres database in order to retrieve shelf data.
        const getShelfData = async () => {
            try {
                // Get the authenticated user (if given).
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                // If the user is not authenticated, redirect them to the login page.
                if (!token) {
                    navigate('/login')
                }

                // Make API call.
                const response = await getShelf(id);

                // Throw an error if the response was unsuccessful.
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                // Parse JSON response.
                const shelf = await response.json();

                // Set the shelf data state variable to our shelf.
                setShelfData(shelf)

                // If one of the likes in shelf is from the currently authenticated user, set the isLiked state to true.
                for (let i = 0; i < shelf.likes.length; i++) {
                    if (shelf.likes[i].user_id === Auth.getProfile().data.id) {
                        setIsLiked('true');
                    }
                }

                // Set the total number of likes to the length of the shelf's likes array.
                setTotalLikes(shelf.likes.length);
                setEditedTitle(shelf.name);
                // Set the loading variable to false.
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        getShelfData();
    }, [shelfDataLength])

    // Function for removing an album/vinyl from the database.
    const handleRemoveFromShelf = async (vinyl) => {
        try {
            // Set the loading state for deletion to true.
            setLoadingDeleteVinyl(true)

            // Initiate our payload which identifies the ID of the album to be removed and the ID of the shelf to remove it from.
            const payload = {
                shelfId: shelfData.id,
                vinylId: vinyl.id
            }

            // Pass in our payload.
            const response = await removeFromShelf(payload);

            // If the call fails, throw an error.
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }


            // Set the loading state to false.
            setLoadingDeleteVinyl(false)

            // Update the existing shelf data without the deleted vinyl.
            setShelfData(shelfData.vinyls_on_shelf.filter(album => album.id != vinyl.id))
        } catch (error) {
            console.error(error);
        }
    }

    // Handle functionality for liking or removing a like from a shelf.
    const handleLikeShelf = async () => {
        try {
            // Set the loading state to true.
            setLoadingLike(true)

            // Initiate our payload.
            const payload = {
                shelfId: shelfData.id,
                userId: Auth.getProfile().data.id
            }

            // Define response for easy access outside of the if statement.
            let response;

            // This will perform something different depending on whether isLiked is true or false.
            if (isLiked === 'false') {
                // Like the shelf if it isn't liked.
                response = await likeShelf(payload)
                setIsLiked('true');
                setTotalLikes(totalLikes + 1);

                // Inform the user if it was successful.
                triggerPopup(`Added ${shelfData.name} to liked shelves.`);
            } else {
                // If the shelf is liked, remove the like.
                response = await deleteLike(payload)
                setIsLiked('false');
                setTotalLikes(totalLikes - 1);

                // Inform the user if it was unsuccessful.
                triggerPopup(`Removed ${shelfData.name} from liked shelves.`);
            }

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // Set the loading state to false.
            setLoadingLike(false)
        } catch (error) {
            console.error(error)
        }
    }

    // Copies URL to user's clipboard for sharing.
    const handleShare = async () => {
        await navigator.clipboard.writeText(window.location.href)
        triggerPopup("Copied to clipboard.")
    }

    // Logic for triggering popup.
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

    // Handles updates to the shelf's name.
    const handleUpdateShelf = async (payload) => {
        try {
            // Set loading state to true.
            setLoadingEdit(true);

            // Make API call to update shelf.
            const response = await updateShelf(payload);

            // Throw error if unsuccessful.
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // Update shelf data.
            setShelfData({
                ...shelfData,
                name: editedTitle
            })

            // Inform user if operation was success.
            triggerPopup("Successfully updated shelf.")
            setLoadingEdit(false);

            // Close the editor.
            setEditing(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* Conditionally render loading component */}
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}

            {/* Conditionally render alert text. */}
            {popup.visible ? (
                <Alert text={popup.text}></Alert>
            ) : (
                <></>
            )}

            <ShelfHeader>
                {!editing ? (
                    // If the user is not editing the title, display it as normal.
                    <>
                        <h1>{shelfData.name}</h1>
                        <h2>By <Link to={`/user/${shelfData.user_id}`}>{shelfData?.user?.username}</Link></h2>
                    </>
                ) : (
                    <>
                        {/* Otherwise, display the editor for the title. */}
                        <TitleEditor
                            value={editedTitle}
                            maxLength={30}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Enter a shelf title..."></TitleEditor>
                        <TitleEditorButtonWrapper>
                            {/* If the changes made to the editor are not being loaded, display the options for saving or canceling the edit. */}
                            {!loadingEdit ? (
                                <>
                                    <TitleEditorButton onClick={() => handleUpdateShelf({ id: shelfData.id, title: editedTitle })}>
                                        Save
                                    </TitleEditorButton>
                                    <TitleEditorButton onClick={() => setEditing(false)}>
                                        Cancel
                                    </TitleEditorButton>
                                </>
                            ) : (
                                <LoadingMini />
                            )}
                        </TitleEditorButtonWrapper>

                    </>
                )}
                {/* Display certain settings such as for editing or deletion if the user is authenticated as the author. */}
                {Auth.loggedIn() && (
                    <SettingsTab>
                        {!loadingLike ? (
                            <LikeButton liked={isLiked} icon={like} onClick={async () => handleLikeShelf()}></LikeButton>
                        ) : (
                            <LoadingMini />
                        )}

                        <SettingsButton onClick={() => handleShare()} icon={share}></SettingsButton>
                        {Auth.getProfile().data.id == shelfData.user_id ? (
                            <>
                                <SettingsButton onClick={() => setShowConfirmDelete(true)} icon={trash}></SettingsButton>
                                <SettingsButton onClick={() => setEditing(true)} icon={edit}></SettingsButton>
                            </>
                        ) : (
                            <></>
                        )}
                        <TotalLikes>
                            <div></div>
                            <h2>{totalLikes}</h2>
                        </TotalLikes>
                    </SettingsTab>
                )}

            </ShelfHeader>
            <UnorderedList>
                {/* Display all vinyls on the shelf. */}
                {shelfData?.vinyls_on_shelf?.length ? (
                    <>
                        {shelfData.vinyls_on_shelf?.map(({ vinyl }, i) =>
                            <ListItem key={i}>
                                <Cover cover={vinyl.cover_image}></Cover>
                                <VinylInfo>
                                    <b><p>{vinyl.title}</p></b>
                                    {/* If the author of the shelf is authenticated, display options for deleting albums from shelf. */}
                                    {Auth.loggedIn() && (
                                        <>
                                            {Auth.getProfile().data.id == shelfData.user_id ? (
                                                <>
                                                    {!loadingDeleteVinyl ? (
                                                        <DeleteVinyl onClick={async () => handleRemoveFromShelf(vinyl)}></DeleteVinyl>
                                                    ) : (
                                                        <LoadingMini></LoadingMini>
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )}
                                </VinylInfo>
                            </ListItem>
                        )}
                    </>
                ) : (
                    // Display empty shelf message.
                    <>
                        <EmptyShelves height={"calc(100svh - 229px)"}>
                            {Auth.getProfile().data.id == shelfData.user_id ? (
                                <>
                                    <p>This shelf is empty.
                                        Search <InlineIcon icon={search}></InlineIcon> for records to add to your shelf.</p>
                                </>
                            ) : (
                                <p>This shelf is empty.</p>
                            )}

                        </EmptyShelves>
                    </>
                )}

            </UnorderedList>
            {/* Show the popup for deletion confirmation if the user selects the option to delete the shelf. */}
            {showConfirmDelete ? (
                <ConfirmDelete auth={Auth} shelfData={shelfData} setShowConfirmDelete={setShowConfirmDelete} />
            ) : (
                <></>
            )}
        </>
    );
}

export default Shelf;