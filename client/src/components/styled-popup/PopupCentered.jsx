import styled from "styled-components";

export const PopupCentered = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        color: ${props => props.theme.fg}
    }
`;