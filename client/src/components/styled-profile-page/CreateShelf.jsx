import styled from "styled-components";
import { AddToShelfButton } from "../styled-vinyl/AddToShelfButton";
import add_shelf from '../../assets/add_shelf.svg';

export const CreateShelf = styled(AddToShelfButton)`
    background-image: url(${add_shelf});
`;