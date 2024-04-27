import styled from "styled-components";

export const SearchWrapper = styled.form`
    display: block;
    position: relative;
    padding: 2rem 2rem 0 2rem;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.bg};

    p {
        margin-top: 1rem;
    }
`;