/* eslint-disable react/prop-types */
import styled from "styled-components";
import add from '../assets/add.svg';
import { useEffect, useState } from "react";
import { createVinyl } from "../utils/API";

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
    background-image: url(${add});
    background-position: center;
    background-size: 2rem;
    background-color: ${props => props.inshelf === 'true' ? props.theme.primary : 'green'};

    &:hover {
        cursor: pointer;
    }
`;

export const ShelfItem = ({ shelf, albumData }) => {
    const [inShelf, setInShelf] = useState(true)

    shelf.vinyl_on_shelf.forEach((vinyl) => {
        // check if album already exists in collection
        if (vinyl.id == albumData.id) {
            setInShelf(true);
        }
    })

    const handleUpdateShelf = async () => {
        try {
            await createVinyl(albumData)
        } catch (error) {
            // If an error is thrown, the album already likely exists
            // Do nothing and proceed normally with the program
        }

        if (inShelf == false) {
            // 
        } else {
            //
        }

        setInShelf(!inShelf)
    }

    return (
        <ShelfItemWrapper>
            <Preview>

            </Preview>
            <h1>{shelf.name}</h1>
            <UpdateShelf inshelf={inShelf.toString()} onClick={() => handleUpdateShelf()}>

            </UpdateShelf>
        </ShelfItemWrapper>
    );
}