import { useParams } from "react-router-dom";
import { getShelf, removeFromShelf, likeShelf, deleteLike } from "../utils/API";
import { useEffect, useState } from "react";
import styled from "styled-components";
import trash from '../assets/trash.svg';
import like from '../assets/like.svg';
import Auth from "../utils/auth";
import { ConfirmDelete } from "../components/confirmDelete";
import search_light from '../assets/search_light.svg';
import { Loading } from "../components/loading";

const ShelfWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;
`;

const ShelfHeader = styled.div`
    & > h1 {
        font-size: 3rem;
        margin-bottom: .5rem;
    }

    border-bottom: 1px solid ${props => props.theme.fg};
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
    margin-right: 5px;
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

const Shelf = () => {
    const { id } = useParams();
    const [shelfData, setShelfData] = useState([]);
    const [isLiked, setIsLiked] = useState('false');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(true);

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
            const payload = {
                shelfId: shelfData.id,
                userId: Auth.getProfile().data.id
            }

            let response;

            if (isLiked === 'false') {
                response = await likeShelf(payload)
                setIsLiked('true')
            } else {
                response = await deleteLike(payload)
                setIsLiked('false')
            }

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ShelfWrapper>
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}
            <ShelfHeader>
                <h1>{shelfData.name}</h1>
                <SettingsTab>
                    {Auth.getProfile().data.id == shelfData.user_id ? (
                        <>
                            <SettingsButton onClick={() => setShowConfirmDelete(true)} icon={trash}></SettingsButton>
                        </>
                    ) : (
                        <></>
                    )}
                    <LikeButton liked={isLiked} icon={like} onClick={async () => handleLikeShelf()}></LikeButton>
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