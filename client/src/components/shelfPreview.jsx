import styled from "styled-components";
import { Link } from "react-router-dom"
import { EmptyShelf } from "./styled-shelf";

const ShelfPreviewWrapper = styled.div`
    display: flex;
`

const AlbumsWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 5px;

    background-color: ${props => props.theme.secondary};

    padding: 10px;
    display: flex;
    flex-wrap: wrap;
`;

const AlbumMini = styled.div`
    flex-grow: 1;
    min-width: 20px;
    display: block;
    margin: 2px;
    border-radius: 5px;
    background-position: center;
    background-size: cover;
    background-color: ${props => props.theme.secondary};
    background-image: url(${props => props.cover});
`

const ShelfOptions = styled.div`
    margin-left: 1rem;
    margin: auto 1rem;

    p {
        text-decoration: none;
        font-size: 1.3rem;
    }
`;

export const ShelfPreview = ({ shelf }) => {
    return (
        <Link to={`/shelf/${shelf.id}`}>
            <ShelfPreviewWrapper>
                <AlbumsWrapper>
                    {shelf.vinyls_on_shelf.length ? (
                        (shelf.vinyls_on_shelf.length < 4) ? (
                            <AlbumMini cover={shelf.vinyls_on_shelf[0].vinyl.cover_image} />
                        ) : (
                            <>
                                <AlbumMini cover={shelf.vinyls_on_shelf[0].vinyl.cover_image} />
                                <AlbumMini cover={shelf.vinyls_on_shelf[1].vinyl.cover_image} />
                                <AlbumMini cover={shelf.vinyls_on_shelf[2].vinyl.cover_image} />
                                <AlbumMini cover={shelf.vinyls_on_shelf[3].vinyl.cover_image} />
                            </>
                        )
                    ) : (
                        <EmptyShelf />
                    )}
                </AlbumsWrapper>
                <ShelfOptions>
                    <p>{shelf.name}</p>
                </ShelfOptions>
            </ShelfPreviewWrapper>
        </Link>
    );
}