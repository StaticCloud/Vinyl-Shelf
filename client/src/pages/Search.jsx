import styled from "styled-components";
import { useState } from "react";
import { searchVinyls, searchShelves } from "../utils/API";
import search_light from '../assets/search_light.svg'
import SearchResult from "./SearchResult";
import { Loading } from "../components/loading";
import ToggleableButton from "../components/toggleableButton";

const SearchWrapper = styled.form`
    display: block;
    position: relative;
    padding: 2rem 2rem 0 2rem;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.bg};

    p {
        margin-top: 1rem;
    }
`;

const SearchBar = styled.input`
    display: inline-block;
    background-color: ${props => props.theme.primary};
    border-radius: 5rem 0 0 5rem;
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
    border-radius: 0 5rem 5rem 0;

    &:hover {
        cursor: pointer;
    }
`;

const NoResultsWrapper = styled.section`
    display: flex;
    height: calc(100svh - 177.4px);
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const SearchToggleWrapper = styled.div`
    display: flex;
    padding: 0 2rem;
    margin-bottom: 2rem;
`;

const LiWrapper = styled.li`
    margin: 0 2rem 2rem 2rem;

    a {
        text-decoration: none;
        color: ${props => props.theme.fg};
    }
`;

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false)
    const [emptyText, setEmptyText] = useState('Enter an album name to get started.')
    const [searchedAlbums, setSearchedAlbums] = useState([]);
    const [searchedShelves, setSearchedShelves] = useState([])

    const [searchFilter, setSearchFilter] = useState({
        vinylView: true,
        shelfView: false
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)

        if (!searchInput) {
            return false;
        }

        try {
            const response = await Promise.all([searchVinyls(searchInput), searchShelves(searchInput)]);

            if (!response[0].ok && !response[1].ok) {
                throw new Error('something went wrong!');
            }

            const searchData = await Promise.all([response[0].json(), response[1].json()]);

            const vinyls = searchData[0].results;
            const shelves = searchData[1];

            if (!vinyls.length) {
                setSearchedAlbums([])
                setEmptyText(`No results for ${searchInput}.`)
            } else {
                setSearchedAlbums(vinyls);
            }

            if (!shelves.length) {
                setSearchedShelves([])
                setEmptyText(`No results for ${searchInput}.`)
            } else {
                setSearchedShelves(shelves);
            }

            setSearchInput('');
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}

            <SearchWrapper onSubmit={handleFormSubmit}>
                <SearchBar
                    placeholder="Enter an album title..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}>

                </SearchBar>
                <SubmitSearch type="submit" value=" ">
                </SubmitSearch>
            </SearchWrapper>
            {searchedAlbums.length || searchedShelves.length ? (
                <SearchToggleWrapper>
                    <ToggleableButton text={"Vinyls"}
                        selected={searchFilter.vinylView}
                        onClick={() => setSearchFilter({
                            vinylView: true,
                            shelfView: false
                        })}>
                        <p>Vinyls</p>
                    </ToggleableButton>
                    <ToggleableButton text={"Shelves"}
                        selected={searchFilter.shelfView}
                        onClick={() => setSearchFilter({
                            vinylView: false,
                            shelfView: true
                        })}>
                        <p>Shelves</p>
                    </ToggleableButton>
                </SearchToggleWrapper>
            ) : (
                <></>
            )}

            {searchedAlbums.length || searchedShelves.length ? (
                <>
                    {searchedAlbums.length ? (
                        <>
                            {searchFilter.vinylView === true ? (
                                <SearchResults>
                                    {searchedAlbums.map((album, i) => {
                                        return (
                                            <LiWrapper key={i}>
                                                <SearchResult album={album} />
                                            </LiWrapper>
                                        )
                                    })}
                                </SearchResults>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <NoResultsWrapper>
                            <p>{emptyText}</p>
                        </NoResultsWrapper>
                    )}

                    {searchedShelves.length ? (
                        <>
                            {searchFilter.shelfView === true ? (
                                <SearchResults>
                                    {searchedShelves.map((shelf, i) => {
                                        return (
                                            <LiWrapper key={i}>
                                                <SearchResult shelf={shelf} />
                                            </LiWrapper>
                                        )
                                    })}
                                </SearchResults>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <NoResultsWrapper>
                            <p>{emptyText}</p>
                        </NoResultsWrapper>
                    )}
                </>
            ) : (
                <NoResultsWrapper>
                    <p>{emptyText}</p>
                </NoResultsWrapper>
            )}
        </>
    );
}

export default Search;