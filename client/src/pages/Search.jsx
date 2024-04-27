import { useState } from "react";
import { searchVinyls, searchShelves } from "../utils/API";
import SearchResult from "./SearchResult";
import { Loading } from "../components/Loading";
import ToggleableButton from "../components/styled-button/ToggleableButton";
import { UnorderedList, ListItem } from "../components/styled-list";
import { SearchWrapper, SubmitSearch, SearchBar, NoResults, ToggleWrapper } from "../components/styled-search";

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
                <ToggleWrapper>
                    <ToggleableButton
                        selected={searchFilter.vinylView}
                        onClick={() => setSearchFilter({
                            vinylView: true,
                            shelfView: false
                        })}>
                        <p>Vinyls</p>
                    </ToggleableButton>
                    <ToggleableButton
                        selected={searchFilter.shelfView}
                        onClick={() => setSearchFilter({
                            vinylView: false,
                            shelfView: true
                        })}>
                        <p>Shelves</p>
                    </ToggleableButton>
                </ToggleWrapper>
            ) : (
                <></>
            )}

            {searchedAlbums.length || searchedShelves.length ? (
                <>
                    {searchedAlbums.length ? (
                        <>
                            {searchFilter.vinylView === true ? (
                                <UnorderedList>
                                    {searchedAlbums.map((album, i) => {
                                        return (
                                            <ListItem key={i}>
                                                <SearchResult album={album} />
                                            </ListItem>
                                        )
                                    })}
                                </UnorderedList>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <NoResults>
                            <p>{emptyText}</p>
                        </NoResults>
                    )}

                    {searchedShelves.length ? (
                        <>
                            {searchFilter.shelfView === true ? (
                                <UnorderedList>
                                    {searchedShelves.map((shelf, i) => {
                                        return (
                                            <ListItem key={i}>
                                                <SearchResult shelf={shelf} />
                                            </ListItem>
                                        )
                                    })}
                                </UnorderedList>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <NoResults>
                            <p>{emptyText}</p>
                        </NoResults>
                    )}
                </>
            ) : (
                <NoResults>
                    <p>{emptyText}</p>
                </NoResults>
            )}
        </>
    );
}

export default Search;