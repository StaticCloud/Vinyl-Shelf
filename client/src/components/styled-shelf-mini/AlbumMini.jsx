import styled from "styled-components"

export const AlbumMini = styled.div`
    flex-grow: 1;
    min-width: 15px;
    display: block;
    margin: 1px;
    border-radius: 8%;
    background-position: center;
    background-size: cover;
    background-color: ${props => props.theme.secondary};
    background-image: url(${props => props.cover});
`