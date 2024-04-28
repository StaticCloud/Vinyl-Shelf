import styled from "styled-components";

export const ListItem = styled.li`
    margin: 0 2rem 2rem 2rem;
    display: flex;

    a {
        text-decoration: none;
        display: flex;
        width: 100%;
        color: ${props => props.theme.fg};
    }
`;