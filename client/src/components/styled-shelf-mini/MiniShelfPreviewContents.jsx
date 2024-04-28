import styled from "styled-components";
import { ShelfPreviewContents } from '../styled-shelf'

export const MiniShelfPreviewContents = styled(ShelfPreviewContents)`
    width: 50px;
    height: 50px;
    background-color: ${props => props.theme.primary};
    padding: 5px;
`;