/* eslint-disable react/prop-types */
import styled from "styled-components";
import add from '../assets/add.svg';
import loading from '../assets/loading.svg'
import check from '../assets/check.svg'
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
    border-radius: 0.5rem;
    background-color: ${props => props.theme.primary}
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

            </Preview>
            <h1>{shelf.name}</h1>
            {!loading ? (
                <UpdateShelf inshelf={inShelf.toString()} onClick={() => handleUpdateShelf()}/>
            ) : (
                <UpdatingShelfSpinner/>
            )}
        </ShelfItemWrapper>
    );
}