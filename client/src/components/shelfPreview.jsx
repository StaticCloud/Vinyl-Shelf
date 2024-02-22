import styled from "styled-components";

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
    background-image: url(${props => props.cover});
`

const ShelfOptions = styled.div`
    flex-grow: 1;

    margin-left: 1rem;
    display: flex;
    align-items: center;
`;

export const ShelfPreview = ({ shelf }) => {
    return (
        <ShelfPreviewWrapper>
            <AlbumsWrapper>
                {(shelf.vinyl_on_shelf.length < 4) ? (
                    <AlbumMini cover={shelf.vinyl_on_shelf[0].vinyl.cover_image} />
                ) : (
                    <></>
                )}
            </AlbumsWrapper>
            <ShelfOptions>
                <h1>{shelf.name}</h1>
            </ShelfOptions>
        </ShelfPreviewWrapper>
    );
}