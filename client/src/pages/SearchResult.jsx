/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import add from '../assets/add.svg'
import Auth from '../utils/auth';
import { AddAlbum } from '../components/addAlbum';

const SearchResultWrapper = styled.li`
    max-width: 100svw;
    margin: 2rem;
    display: flex;
    align-items: center;

    &:first-child {
        margin-top: 0;
    }

    h1 {
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1rem;
    }
`;

const Cover = styled.div`
    min-width: 80px;
    height: 80px;
    background-size: cover;
    border-radius: 0.5rem;
    background-image: url(${props => props.cover});
    background-color: ${props => props.theme.primary};
`

const Info = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1rem;
    flex-grow: 1;
`;

const OpenModalButton = styled.div`
    min-width: 40px;
    height: 40px;
    background-image: url(${add});
    background-position: center;
    background-size: 2rem;
    background-color: ${props => props.theme.secondary};
    border-radius: 50%;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primary};
    }
`;

const SearchResult = ({ album }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <SearchResultWrapper>
            <Cover cover={album.cover_image}/>
            <Info>
                <div>
                    <h1>{album.title}</h1>
                    <p>{album.year}</p>
                </div>
            </Info>
            {Auth.loggedIn() ? (
                <OpenModalButton onClick={() => setShowMenu(true)}/>
            ) : (
                <></>
            )}
            {showMenu ? (
                <AddAlbum albumData={album} setShowMenu={setShowMenu}/>
            ) : (
                <></>
            )}
        </SearchResultWrapper>
    );
}

export default SearchResult;