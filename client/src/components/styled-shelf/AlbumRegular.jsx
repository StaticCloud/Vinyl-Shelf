import styled from "styled-components"

export const AlbumRegular = styled.div`
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