import styled from "styled-components";

export const MiniShelfPreviewContents = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: ${props => props.theme.primary};

    padding: 5px;
    display: flex;
    flex-wrap: wrap;
`;