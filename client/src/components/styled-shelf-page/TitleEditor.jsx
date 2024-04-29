import styled from "styled-components";

export const TitleEditor = styled.input`
    width: 100%;
    font-size: 3rem;
    margin-bottom: 1rem;
    background: none;
    color: ${props => props.theme.fg};
    border-bottom: 1px solid ${props => props.theme.fg};

    &:focus {
        outline: none;
    }
`;