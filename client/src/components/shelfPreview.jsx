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
`;

const ShelfOptions = styled.div`
    flex-grow: 1;

    margin-left: 1rem;
    display: flex;
    align-items: center;
`;

export const ShelfPreview = ({ shelf }) => {
    console.log(shelf)
    return (
        <ShelfPreviewWrapper>
            <AlbumsWrapper>

            </AlbumsWrapper>
            <ShelfOptions>
                <h1>{shelf.name}</h1>
            </ShelfOptions>
        </ShelfPreviewWrapper>
    );
}