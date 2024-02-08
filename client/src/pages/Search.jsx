import styled from "styled-components";
import { useState } from "react";
import { search } from "../utils/API";

const SearchWrapper = styled.form`
    display: block;
    padding: 2rem;
    background-color: ${props => props.theme.bg};
    margin-bottom: 60px;

    p {
        margin-top: 1rem;
    }
`;

const SearchBar = styled.input`
    display: inline-block;
    font-size: 3rem;
    border-bottom: 3px solid ${props => props.theme.fg};
    background-color: ${props => props.theme.bg};
    padding: 0.3rem;
    outline: none;
    width: 100%;
`

const SearchResults = styled.section`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

const SearchResult = styled.div`
    aspect-ratio: 1;
    background-size: cover;
    background-image: url(${props => props.cover});
`;

const Search = () => {
    const [searchInput, setSearchInput] = useState('');

    const [searchedAlbums, setSearchedAlbums] = useState([]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await search(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { results } = await response.json();

            setSearchedAlbums(results);
            setSearchInput('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SearchWrapper onSubmit={handleFormSubmit}>
            <SearchBar
                placeholder="Enter an album title..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} />
            <SearchResults>
                {searchedAlbums.length ? (
                    searchedAlbums.map((album, i) => {
                        return (
                            <SearchResult key={i} cover={album.cover_image} />
                        )
                    })
                ) : (
                    <p>Your results will appear here...</p>
                )}
            </SearchResults>
        </SearchWrapper>
    );
}

export default Search;