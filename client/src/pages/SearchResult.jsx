/* eslint-disable react/prop-types */
import styled from 'styled-components';

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
        flex-grow: 1;
    }

    .info p {
        margin-left: 1rem;
        font-size: 2rem;
    }
`;

const SearchResult = ({ album }) => {
    console.log(album)
    return (
        <SearchResultWrapper cover={album.cover_image}>
            <div className='cover'>

            </div>
            <div className='info'>
                <p>{album.title}</p>
            </div>
        </SearchResultWrapper>
    );
}

export default SearchResult;