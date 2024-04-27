import styled from "styled-components"

export const PopupWrapper = styled.div`
    width: 600px;
    height: ${props => props.height};
    border-radius: 1rem;
    background-color: ${props => props.theme.secondary};
    overflow-y: scroll;
    position: relative;
`