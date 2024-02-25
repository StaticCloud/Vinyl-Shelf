import styled from "styled-components";
import profile_light from '../assets/profile_light.svg'
import eye from '../assets/eye.svg'
import { Link } from "react-router-dom"

const ShelfPreviewWrapper = styled.li`
    display: block;
    margin: 1rem 0;
    display: flex;
`

const AlbumsWrapper = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 1rem;

    background-color: ${props => props.theme.primary};
    display: grid;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
`;

const AlbumMini = styled.div`
    flex-grow: 1;
    min-width: 30px;
    display: block;
    margin: 2px;
    border-radius: 20%;
    background-position: center;
    background-size: cover;
    background-color: ${props => props.theme.secondary};
    background-image: url(${props => props.cover});
`

const ShelfOptions = styled.div`
    margin-left: 1rem;
    margin: auto 1rem;
`;

const EmptyShelf = styled.div`
    flex-grow: 1;
    border-radius: 20%;
    background-position: center;
    background-size: 3rem;
    background-color: ${props => props.theme.secondary};
    background-image: url(${profile_light});
`;

const ButtonWrapper = styled.div`
    border-radius: 2rem;
    display: inline-flex;
    margin-top: 5px;
    height: 30px;
    background-color: ${props => props.theme.primary};

    a {
        display: block;
        width: 30px;
        height: 30px;
    }
`;

const LinkIcon = styled.div`
    width: 30px;
    height: 30px;

    background-position: center;
    background-size: 2.5rem;
    background-image: url(${props => props.icon});
`;

export const ShelfPreview = ({ shelf }) => {
    console.log(shelf)

    return (
        <ShelfPreviewWrapper>
            <AlbumsWrapper>
                {shelf.vinyl_on_shelf.length ? (
                    (shelf.vinyl_on_shelf.length < 4) ? (
                        <AlbumMini cover={shelf.vinyl_on_shelf[0].vinyl.cover_image} />
                    ) : (
                        <>
                            <AlbumMini cover={shelf.vinyl_on_shelf[0].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyl_on_shelf[1].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyl_on_shelf[2].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyl_on_shelf[3].vinyl.cover_image} />
                        </>
                    )
                ) : (
                    <EmptyShelf></EmptyShelf>
                )}
            </AlbumsWrapper>
            <ShelfOptions>
                <h1>{shelf.name}</h1>
                <ButtonWrapper>
                    <Link to={`/shelf/${shelf.id}`}>
                        <LinkIcon icon={eye}/>
                    </Link>
                </ButtonWrapper>
            </ShelfOptions>
        </ShelfPreviewWrapper>
    );
}