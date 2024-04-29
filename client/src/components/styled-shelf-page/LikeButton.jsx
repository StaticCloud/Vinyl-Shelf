import styled from "styled-components";
import { SettingsButton } from "./SettingsButton";

export const LikeButton = styled(SettingsButton)`
    background-color: ${props => props.liked == 'false' ? props.theme.primary : "green"};
    margin-left: 0px;

    &:hover {
        background-color: ${props => props.liked == 'true' ? "green" : props.theme.secondary};;
    }
`