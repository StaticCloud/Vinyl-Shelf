import styled from "styled-components";

export const ListItem = styled.li`
    margin: 0 2rem 2rem 2rem;

    a {
        text-decoration: none;
        color: ${props => props.theme.fg};
    }
`;