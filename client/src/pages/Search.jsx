import { useState } from "react";
import { searchVinyls, searchShelves } from "../utils/API";
import VinylSearchResult from "../components/VinylSearchResult";
import Loading from "../components/Loading";
import ToggleableButton from "../components/styled-button/ToggleableButton";
import { UnorderedList, ListItem } from "../components/styled-list";
import { SearchWrapper, SubmitSearch, SearchBar, NoResults, ToggleWrapper } from "../components/styled-search";
import ShelfPreview from "../components/ShelfPreview";

const Search = () => {
    // Manages the input from the user.
    const [searchInput, setSearchInput] = useState('');

    // Loading state.
    const [loading, setLoading] = useState(false)

    // The text that will appear when search results are empty.
    const [emptyText, setEmptyText] = useState('Your search results will appear here.')

    // Search results for both albums and shelves.
    const [searchedAlbums, setSearchedAlbums] = useState([]);
    const [searchedShelves, setSearchedShelves] = useState([])

    // Search filter that either displays albums or shelves.
    const [searchFilter, setSearchFilter] = useState({
        vinylView: true,
        shelfView: false
    })

    // Runs upon form submission.
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Set the loading state to true since we're making a call to an API.
        setLoading(true)

        // If the search input is void or null, return false.
        if (!searchInput) {
            return false;
        }

        try {
            // Searches for both vinyls and shelves in a single promise.
            const response = await Promise.all([searchVinyls(searchInput), searchShelves(searchInput)]);

            // If either promise fails, throw an error.
            if (!response[0].ok && !response[1].ok) {
                throw new Error('Something went wrong!');
            }

            // Parse the JSON.
            const searchData = await Promise.all([response[0].json(), response[1].json()]);

            // Create a set that we will use to filter out duplicate entries for vinyl results.
            const uniqueTitles = new Set();

            // Ensure that each search result has a unique title to prevent duplicate results
            const vinyls = searchData[0].results.filter(vinyl => {
                if (uniqueTitles.has(vinyl.title)) {
                    return false;
                } else {
                    uniqueTitles.add(vinyl.title)
                    return true;
                }
            });

            // Set the shelves to the result of our search data for better readability.
            const shelves = searchData[1];

            // If the vinyl results yield null, set the state variable to an empty array and inform the user.
            if (!vinyls.length) {
                setSearchedAlbums([])
                setEmptyText(`No results for ${searchInput}.`)
            } else {
                setSearchedAlbums(vinyls);
            }

            // If the shelf results yield null, set the state variable to an empty array and inform the user.
            if (!shelves.length) {
                setSearchedShelves([])
                setEmptyText(`No results for ${searchInput}.`)
            } else {
                setSearchedShelves(shelves);
            }

            // Reset the search input and update the loading state to false.
            setSearchInput('');
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* Conditionally render the loading component. */}
            {loading ? (
                <Loading></Loading>
            ) : (
                <></>
            )}

            {/* Search bar */}
            <SearchWrapper onSubmit={handleFormSubmit}>
                <SearchBar
                    placeholder="Enter an album title..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}>

                </SearchBar>
                <SubmitSearch type="submit" value=" " disabled={!searchInput}>
                </SubmitSearch>
            </SearchWrapper>
            {/* Search results are displayed here. */}
            {searchedAlbums.length || searchedShelves.length ? (
                <ToggleWrapper>
                    {/* Sets the search filter to show vinyls. */}
                    <ToggleableButton
                        selected={searchFilter.vinylView}
                        onClick={() => setSearchFilter({
                            vinylView: true,
                            shelfView: false
                        })}>
                        <p>Vinyls ({searchedAlbums.length})</p>
                    </ToggleableButton>
                    {/* Sets the search filter to show shelves. */}
                    <ToggleableButton
                        selected={searchFilter.shelfView}
                        onClick={() => setSearchFilter({
                            vinylView: false,
                            shelfView: true
                        })}>
                        <p>Shelves ({searchedShelves.length})</p>
                    </ToggleableButton>
                </ToggleWrapper>
            ) : (
                <></>
            )}

            {searchedAlbums.length || searchedShelves.length ? (
                <>
                    {searchFilter.vinylView === true ? (
                        <>
                            {searchedAlbums.length ? (
                                <UnorderedList>
                                    {searchedAlbums.map((album, i) => {
                                        return (
                                            <ListItem key={i}>
                                                <VinylSearchResult album={album} />
                                            </ListItem>
                                        )
                                    })}
                                </UnorderedList>
                            ) : (
                                <NoResults>
                                    <p>{emptyText}</p>
                                </NoResults>
                            )}
                        </>
                    ) : (
                        <></>
                    )}

                    {searchFilter.shelfView === true ? (
                        <>
                            {searchedShelves.length ? (
                                <UnorderedList>
                                    {searchedShelves.map((shelf, i) => {
                                        return (
                                            <ListItem key={i}>
                                                <ShelfPreview shelf={shelf} />
                                            </ListItem>
                                        )
                                    })}
                                </UnorderedList>
                            ) : (
                                <NoResults>
                                    <p>{emptyText}</p>
                                </NoResults>
                            )}
                        </>
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
    );
}

export default Search;