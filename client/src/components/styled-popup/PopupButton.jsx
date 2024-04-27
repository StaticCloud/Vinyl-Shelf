import styled from "styled-components";

export const PopupButton = styled.div`
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primary};
    }

    text-align: center;
    padding: 1rem;
    margin: 2px;
    border-radius: 1rem;

    background-color: ${props => props.theme.secondary};
`;