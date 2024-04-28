import styled from "styled-components";

export const ShelfPreviewContents = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 5px;

    background-color: ${props => props.theme.secondary};

    padding: 10px;
    display: flex;
    flex-wrap: wrap;
`;