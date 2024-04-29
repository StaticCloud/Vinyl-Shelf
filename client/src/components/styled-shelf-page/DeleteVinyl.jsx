import styled from "styled-components";
import trash from '../../assets/trash.svg'
import { AddToShelfButton } from "../styled-vinyl";

export const DeleteVinyl = styled(AddToShelfButton)`
    min-width: 30px;
    height: 30px;
    display: block;
    background-image: url(${trash});
    background-color: ${props => props.theme.primary};

    &:hover {
        background-color: ${props => props.theme.secondary};
    }

    margin-left: auto;
`;