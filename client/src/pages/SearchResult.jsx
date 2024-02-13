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

    .cover {
        min-width: 80px;
        height: 80px;
        background-size: cover;
        background-image: url(${props => props.cover});
    }

    .info {
        display: flex;
        align-items: center;
        margin-left: 1rem;
        flex-grow: 1;
    }

    .openModalButton {
        min-width: 40px;
        height: 40px;
        background-image: url(${add});
        background-position: center;
        background-size: 2rem;
        background-color: ${props => props.theme.secondary};
        border-radius: 50%;
    }

    .openModalButton:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primary};
    }

    h1 {
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1rem;
    }
`;

const SearchResult = ({ album }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <SearchResultWrapper cover={album.cover_image}>
            <div className='cover'>

            </div>
            <div className='info'>
                <div>
                    <h1>{album.title}</h1>
                    <p>{album.year}</p>
                </div>
            </div>
            {Auth.loggedIn() ? (
                <div className='openModalButton' onClick={() => setShowMenu(true)}>

                </div>
            ) : (
                <></>
            )}
            {showMenu ? (
                <AddAlbum setShowMenu={setShowMenu}/>
            ) : (
                <></>
            )}
        </SearchResultWrapper>
    );
}

export default SearchResult;