/* eslint-disable react/prop-types */
import styled from "styled-components";
import add from '../assets/add.svg';
import { useEffect, useState } from "react";

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
    background-color: ${props => props.inShelf === true ? props.theme.primary : 'green'};

    &:hover {
        cursor: pointer;
    }
`;

export const ShelfItem = ({ shelf, albumData }) => {
    const [inShelf, setInShelf] = useState(true)

    useEffect(() => {
        shelf.vinyl_on_shelf.forEach((vinyl) => {
            // check if album already exists in collection
            if (vinyl.id == albumData.id) {
                setInShelf(true);
            }
        })
    }, [])

    return (
        <ShelfItemWrapper>
            <Preview>

            </Preview>
            <h1>{shelf.name}</h1>
            <UpdateShelf inShelf={inShelf} onClick={() => setInShelf(!inShelf)}>

            </UpdateShelf>
        </ShelfItemWrapper>
    );
}