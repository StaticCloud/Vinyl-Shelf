import { useParams, Link } from "react-router-dom";
import { getShelf, removeFromShelf, likeShelf, deleteLike, updateShelf } from "../utils/API";
import { useEffect, useState } from "react";
import trash from '../assets/trash.svg';
import like from '../assets/like.svg';
import Auth from "../utils/auth";
import { ConfirmDelete } from "../components/ConfirmDelete";
import search_light from '../assets/search_light.svg';
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
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [loadingLike, setLoadingLike] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);

    const [shelfData, setShelfData] = useState([]);
    const [popup, setPopup] = useState({
        visible: false,
        text: ''
    });

    const [isLiked, setIsLiked] = useState('false');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    const shelfDataLength = Object.keys(shelfData).length;

    useEffect(() => {
        const getShelfData = async () => {
            try {
                const response = await getShelf(id);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const shelf = await response.json();

                setShelfData(shelf)

                for (let i = 0; i < shelf.likes.length; i++) {
                    if (shelf.likes[0].user_id === Auth.getProfile().data.id) {
                        setIsLiked('true');
                    } else {
                        setIsLiked('false');
                    }
                }

                setLoading(false)
                setTotalLikes(shelf.likes.length)
                setEditedTitle(shelf.name);
            } catch (error) {
                console.error(error);
            }
        }

        getShelfData();
    }, [shelfDataLength])

    const handleRemoveFromShelf = async (vinyl) => {
        try {
            const payload = {
                shelfId: shelfData.id,
                vinylId: vinyl.id
            }

            const response = await removeFromShelf(payload);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            setShelfData(shelfData.vinyls_on_shelf.filter(album => album.id != vinyl.id))
        } catch (error) {
            console.error(error);
        }
    }

    const handleLikeShelf = async () => {
        try {
            setLoadingLike(true)

            const payload = {
                shelfId: shelfData.id,
                userId: Auth.getProfile().data.id
            }

            let response;

            if (isLiked === 'false') {
                response = await likeShelf(payload)
                setIsLiked('true');
                setTotalLikes(totalLikes + 1);
                triggerPopup(`Added ${shelfData.name} to liked shelves`);
            } else {
                response = await deleteLike(payload)
                setIsLiked('false');
                setTotalLikes(totalLikes - 1);
                triggerPopup(`Removed ${shelfData.name} from liked shelves`);
            }

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            setLoadingLike(false)
        } catch (error) {
            console.error(error)
        }
    }

    const HandleShare = async () => {
        await navigator.clipboard.writeText(window.location.href)
        triggerPopup("Copied to clipboard.")
    }

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

    const HandleUpdateShelf = async (payload) => {
        try {
            setLoadingEdit(true);

            const response = await updateShelf(payload);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            setShelfData({
                ...shelfData,
                name: editedTitle
            })

            setEditing(false)
            triggerPopup("Successfully updated shelf.")
            setLoadingEdit(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {loading === true ? (
                <Loading></Loading>
            ) : (
                <></>
            )}

            {popup.visible === true ? (
                <Alert text={popup.text}></Alert>
            ) : (
                <></>
            )}

            <ShelfHeader>
                {!editing ? (
                    <>
                        <h1>{shelfData.name}</h1>
                        <h2>By <Link to={`/user/${shelfData.user_id}`}>{shelfData?.user?.username}</Link></h2>
                    </>
                ) : (
                    <>
                        <TitleEditor
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Enter a shelf title..."></TitleEditor>
                        <TitleEditorButtonWrapper>
                            {!loadingEdit ? (
                                <>
                                    <TitleEditorButton onClick={() => HandleUpdateShelf({ id: shelfData.id, title: editedTitle })}>
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

                <SettingsTab>
                    {!loadingLike ? (
                        <LikeButton liked={isLiked} icon={like} onClick={async () => handleLikeShelf()}></LikeButton>
                    ) : (
                        <LoadingMini />
                    )}

                    <SettingsButton onClick={() => HandleShare()} icon={share}></SettingsButton>
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
            </ShelfHeader>
            <UnorderedList>
                {shelfData?.vinyls_on_shelf?.length ? (
                    <>
                        {shelfData.vinyls_on_shelf?.map(({ vinyl }, i) =>
                            <ListItem key={i}>
                                <Cover cover={vinyl.cover_image}></Cover>
                                <VinylInfo>
                                    <p>{vinyl.title}</p>
                                    {Auth.getProfile().data.id == shelfData.user_id ? (
                                        <DeleteVinyl onClick={async () => handleRemoveFromShelf(vinyl)}></DeleteVinyl>
                                    ) : (
                                        <></>
                                    )}
                                </VinylInfo>
                            </ListItem>
                        )}
                    </>
                ) : (
                    <>
                        <EmptyShelves height={"calc(100svh - 229px)"}>
                            <p>This shelf is empty.
                                Search <InlineIcon icon={search_light}></InlineIcon> for records to add to your shelf.</p>
                        </EmptyShelves>
                    </>
                )}

            </UnorderedList>
            {showConfirmDelete ? (
                <ConfirmDelete auth={Auth} shelfData={shelfData} setShowConfirmDelete={setShowConfirmDelete} />
            ) : (
                <></>
            )}
        </>
    );
}

export default Shelf;