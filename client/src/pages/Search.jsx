import styled from "styled-components";
import { useState } from "react";
import { search } from "../utils/API";
import SearchResult from "./SearchResult";

const SearchWrapper = styled.form`
    display: block;
    padding: 2rem;
    background-color: ${props => props.theme.bg};

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
    color: ${props => props.theme.fg};
`

const SearchResults = styled.ul`
    list-style-type: none;
    background-color: ${props => props.theme.bg};
    padding-bottom: 80px;
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
        <>
            <SearchWrapper onSubmit={handleFormSubmit}>
                <SearchBar
                    placeholder="Enter an album title..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} />
            </SearchWrapper>
            <SearchResults>
                {searchedAlbums.length ? (
                    searchedAlbums.map((album, i) => {
                        return (
                            <SearchResult album={album} key={i} />
                        )
                    })
                ) : (
                    <p>Your results will appear here...</p>
                )}
            </SearchResults>
        </>
    );
}

export default Search;