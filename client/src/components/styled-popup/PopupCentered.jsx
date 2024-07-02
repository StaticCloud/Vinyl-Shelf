import styled from "styled-components";

export const PopupCentered = styled.div`
    height: ${props => props.difference ? `calc(100% - ${props.difference})` : "100%"};
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        display: inline;
        color: ${props => props.theme.fg}
    }
`;