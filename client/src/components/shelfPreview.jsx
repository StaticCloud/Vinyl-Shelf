import styled from "styled-components";
import profile_light from '../assets/profile_light.svg'
import { Link } from "react-router-dom"

const ShelfPreviewWrapper = styled.li`
    display: block;
    margin: 1rem 0;
    display: flex;
`

const AlbumsWrapper = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 5px;

    background-color: ${props => props.theme.secondary};

    padding: 10px;
    display: flex;
    flex-wrap: wrap;
`;

const AlbumMini = styled.div`
    flex-grow: 1;
    min-width: 30px;
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

const EmptyShelf = styled.div`
    flex-grow: 1;
    border-radius: 10px;
    background-position: center;
    background-size: 3rem;
    background-image: url(${profile_light});
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
                        <EmptyShelf></EmptyShelf>
                    )}
                </AlbumsWrapper>
                <ShelfOptions>
                    <p>{shelf.name}</p>
                </ShelfOptions>
            </ShelfPreviewWrapper>
        </Link>
    );
}