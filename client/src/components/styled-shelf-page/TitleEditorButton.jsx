import styled from "styled-components";

export const TitleEditorButton = styled.p`
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.secondary};
    }

    padding: .5rem 1rem;
    margin-right: .5rem;
    border-radius: 2rem;
    font-weight: bold;
    font-size: .9rem;
    color: ${props => props.theme.fg};
    background-color: ${props => props.theme.primary};
`;