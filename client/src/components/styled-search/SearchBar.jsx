import styled from "styled-components";

export const SearchBar = styled.input`
    display: inline-block;
    background-color: ${props => props.theme.primary};
    border-radius: 5rem 0 0 5rem;
    padding: 0.7rem;
    font-size: 1rem;
    outline: none;
    width: calc(100% - 41.4px);
    color: ${props => props.theme.fg};
`;