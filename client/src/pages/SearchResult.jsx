/* eslint-disable react/prop-types */
import styled from 'styled-components';
import add from '../assets/add.svg'
import Auth from '../utils/auth';

const SearchResultWrapper = styled.li`
    max-width: 100svw;
    margin: 2rem;
    display: flex;

    .cover {
        min-width: 100px;
        height: 100px;
        background-size: cover;
        background-image: url(${props => props.cover});
    }

    .info {
        margin-left: 1rem;
        flex-grow: 1;
    }

    .addAlbum {
        min-width: 100px;
        height: 100px;
        background-image: url(${add});
        background-color: ${props => props.theme.nav};
        border-radius: 50%;
    }

`;

const SearchResult = ({ album }) => {
    return (
        <SearchResultWrapper cover={album.cover_image}>
            <div className='cover'>

            </div>
            <div className='info'>
                <h1>{album.title}</h1>
                <p>{album.year}</p>
            </div>
            {Auth.loggedIn() ? (
                <div className='addAlbum'>

                </div>
            ) : (
                <></>
            )}
        </SearchResultWrapper>
    );
}

export default SearchResult;