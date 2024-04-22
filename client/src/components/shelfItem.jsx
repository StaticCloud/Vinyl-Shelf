/* eslint-disable react/prop-types */
import styled from "styled-components";
import add from '../assets/add.svg';
import loading from '../assets/loading.svg'
import check from '../assets/check.svg'
import profile_light from '../assets/profile_light.svg'
import { useEffect, useState } from "react";
import { createVinyl, addToShelf, removeFromShelf } from "../utils/API";

const ShelfItemWrapper = styled.li`
    display: flex;
    align-items: center;
    margin: 1rem;

    h1 {
        margin-left: 10px;
        flex-grow: 1;
    }
`;

const Preview = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: ${props => props.theme.primary};

    padding: 5px;
    display: flex;
    flex-wrap: wrap;
`;

const UpdateShelf = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(${props => props.inshelf === 'false' ? add : check});
    background-position: center;
    background-size: 2rem;
    background-color: ${props => props.inshelf === 'false' ? props.theme.primary : 'green'};

    &:hover {
        cursor: pointer;
    }
`;

const UpdatingShelfSpinner = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(${loading});
    background-position: center;
    background-size: 2rem;
    animation: rotate 1s linear infinite;
    background-color: ${props => props.theme.primary};

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;

const AlbumMini = styled.div`
    flex-grow: 1;
    min-width: 15px;
    display: block;
    margin: 1px;
    border-radius: 8%;
    background-position: center;
    background-size: cover;
    background-color: ${props => props.theme.secondary};
    background-image: url(${props => props.cover});
`

const EmptyShelf = styled.div`
    flex-grow: 1;
    border-radius: 20%;
    background-position: center;
    background-size: 2rem;
    background-color: ${props => props.theme.secondary};
    background-image: url(${profile_light});
`;

export const ShelfItem = ({ shelf, albumData }) => {
    const [inShelf, setInShelf] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        shelf.vinyl_on_shelf.forEach((vinyl) => {
            // check if album already exists in collection
            if (vinyl.vinyl_id == albumData.id) {
                setInShelf(true);
            }
        })
    }, [])

    const handleUpdateShelf = async () => {
        setLoading(true)

        try {
            const response = await createVinyl(albumData)

            console.log(response)
        } catch (error) {
            console.log('')
        }

        const payload = {
            shelfId: shelf.id,
            vinylId: albumData.id
        }

        if (inShelf == false) {
            await addToShelf(payload)
        } else {
            await removeFromShelf(payload)
        }

        setLoading(false)
        setInShelf(!inShelf)
    }

    return (
        <ShelfItemWrapper>
            <Preview>
                {shelf.vinyl_on_shelf.length ? (
                    (shelf.vinyl_on_shelf.length < 4) ? (
                        <AlbumMini cover={shelf.vinyl_on_shelf[0].vinyl.cover_image} />
                    ) : (
                        <>
                            <AlbumMini cover={shelf.vinyl_on_shelf[0].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyl_on_shelf[1].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyl_on_shelf[2].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyl_on_shelf[3].vinyl.cover_image} />
                        </>
                    )
                ) : (
                    <EmptyShelf></EmptyShelf>
                )}
            </Preview>
            <h1>{shelf.name}</h1>
            {!loading ? (
                <UpdateShelf inshelf={inShelf.toString()} onClick={() => handleUpdateShelf()} />
            ) : (
                <UpdatingShelfSpinner />
            )}
        </ShelfItemWrapper>
    );
}