import { useParams, Link } from "react-router-dom";
import { getShelf, removeFromShelf, likeShelf, deleteLike, updateShelf } from "../utils/API";
import { useEffect, useState } from "react";
import styled from "styled-components";
import trash from '../assets/trash.svg';
import like from '../assets/like.svg';
import Auth from "../utils/auth";
import { ConfirmDelete } from "../components/confirmDelete";
import search_light from '../assets/search_light.svg';
import share from '../assets/share.svg'
import edit from '../assets/edit.svg'
import { Loading } from "../components/loading";
import { Popup } from "../components/popup";
import { LoadingMini } from "../components/loadingMini";

const ShelfWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;
`;

const ShelfHeader = styled.div`
    & > h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 1rem;
        font-weight: normal;
    }

    & > h2 {
        margin-bottom: 1rem;
    }

    a {
        font-weight: bold;
        text-decoration: none;
        color: ${props => props.theme.fg};
    }

    border-bottom: 1px solid ${props => props.theme.fg};
`;

const TotalLikes = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5px;

    & > div {
        width: 30px;
        height: 30px;
        background-size: 2.5rem;
        background-position: center;
        background-image: url(${like});
    }
`;

const Vinyls = styled.ul`
    list-style-type: none;
`;

const Vinyl = styled.li`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    & > p {
        margin-left: 20px;
        font-size: 1.3rem;
    }
`

const Cover = styled.div`
    border-radius: 5px;
    min-width: 80px;
    height: 80px;
    display: block;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.cover});
`

const SettingsTab = styled.div`
    margin-bottom: 1rem;
    display: flex;
`;

const SettingsButton = styled.div`
    width: 30px;
    height: 30px;
    background-size: 2rem;
    border-radius: 50%;
    margin-left: 5px;
    background-position: center;
    background-image: url(${props => props.icon});
    background-color: ${props => props.theme.primary};

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.secondary};
    }
`;

const LikeButton = styled(SettingsButton)`
    background-color: ${props => props.liked == 'false' ? props.theme.primary : "green"};
    margin-left: 0px;

    &:hover {
        background-color: ${props => props.liked == 'true' ? "green" : props.theme.secondary};;
    }
`

const EmptyShelvesWrapper = styled.div`
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        justify-content: center;
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
    background-image: url(${search_light});
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
`;

const DeleteVinyl = styled.div`
    min-width: 30px;
    min-height: 30px;
    display: block;
    border-radius: 50%;
    background-image: url(${trash});
    background-position: center;
    background-size: 2rem;
    background-color: ${props => props.theme.primary};

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.secondary};
    }

    // I can't believe this actually works
    margin-left: auto;
`;

const TitleEditor = styled.input`
    width: 100%;
    font-size: 3rem;
    margin-bottom: 1rem;
    background: none;
    color: ${props => props.theme.fg};
    border-bottom: 1px solid ${props => props.theme.fg};

    &:focus {
        outline: none;
    }
`;

const TitleEditorButtonWrapper = styled.div`
    display: flex;
    margin-bottom: 1rem;
`;

const TitleEditorButton = styled.p`
    &:hover {
        cursor: pointer;
    }

    padding: .5rem 1rem;
    margin-right: .5rem;
    border-radius: 2rem;
    font-weight: bold;
    font-size: .9rem;
    color: ${props => props.theme.fg};
    background-color: ${props => props.theme.primary};
`;

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
        <ShelfWrapper>
            {loading === true ? (
                <Loading></Loading>
            ) : (
                <></>
            )}

            {popup.visible === true ? (
                <Popup text={popup.text}></Popup>
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
            <Vinyls>
                {shelfData?.vinyls_on_shelf?.length ? (
                    <>
                        {shelfData.vinyls_on_shelf?.map(({ vinyl }, i) =>
                            <Vinyl key={i}>
                                <Cover cover={vinyl.cover_image}></Cover>
                                <p>{vinyl.title}</p>
                                {Auth.getProfile().data.id == shelfData.user_id ? (
                                    <DeleteVinyl onClick={async () => handleRemoveFromShelf(vinyl)}></DeleteVinyl>
                                ) : (
                                    <></>
                                )}
                            </Vinyl>
                        )}
                    </>
                ) : (
                    <>
                        <EmptyShelvesWrapper>
                            <p>This shelf is empty.
                                Search <InlineIcon></InlineIcon> for records to add to your shelf.</p>
                        </EmptyShelvesWrapper>
                    </>
                )}

            </Vinyls>
            {showConfirmDelete ? (
                <ConfirmDelete auth={Auth} shelfData={shelfData} setShowConfirmDelete={setShowConfirmDelete} />
            ) : (
                <></>
            )}
        </ShelfWrapper>
    );
}

export default Shelf;