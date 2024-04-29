import styled from "styled-components";
import { AddToShelfButton } from "../styled-vinyl";

export const SettingsButton = styled(AddToShelfButton)`
    min-width: 30px;
    height: 30px;
    margin-left: 5px;
    background-image: url(${props => props.icon});
    background-color: ${props => props.theme.primary};

    &:hover {
        background-color: ${props => props.theme.secondary};
    }
`;