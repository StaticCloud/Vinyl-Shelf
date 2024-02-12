import styled from "styled-components";
import { useState } from "react";
import { search } from "../utils/API";
import search_light from '../assets/search_light.svg'
import SearchResult from "./SearchResult";

const SearchWrapper = styled.form`
    display: block;
    position: relative;
    padding: 2rem;
    background-color: ${props => props.theme.bg};

    p {
        margin-top: 1rem;
    }
`;

const SearchBar = styled.input`
    display: inline-block;
    background-color: ${props => props.theme.primary};
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.7rem;
    font-size: 1rem;
    outline: none;
    width: calc(100% - 41.4px);
    color: ${props => props.theme.fg};
`

const SearchResults = styled.ul`
    list-style-type: none;
    background-color: ${props => props.theme.bg};
    padding-bottom: 80px;

    & > p {
        margin: 2rem;
    }
`;

const SubmitSearch = styled.input`
    background-color: ${props => props.theme.secondary};
    display: block;
    width: 41.4px;
    height: 41.4px;
    background-position: center;
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-size: 2.5rem;
    background-image: url(${search_light});
    outline: none;
    border-radius: 0 0.5rem 0.5rem 0;

    &:hover {
        cursor: pointer;
    }
`;

const NoResultsWrapper = styled.section`
    display: flex;
    height: calc(100svh - 105.4px);
    align-items: center;
    justify-content: center;
    text-align: center;
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
                    onChange={(e) => setSearchInput(e.target.value)}>

                </SearchBar>
                <SubmitSearch type="submit" value=" ">
                </SubmitSearch>
            </SearchWrapper>
            {searchedAlbums.length ? (
                <SearchResults>
                    {searchedAlbums.map((album, i) => {
                        return (
                            <SearchResult album={album} key={i} />
                        )
                    })}
                </SearchResults>
            ) : (
                <NoResultsWrapper>
                    <p>Your results will appear here...</p>
                </NoResultsWrapper>
            )}
        </>
    );
}

export default Search;