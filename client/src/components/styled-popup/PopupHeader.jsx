import styled from "styled-components";

export const PopupHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem 1rem 0 0;
    background-color: ${props => props.theme.secondary};
    position: fixed;
    width: 600px;

    & > h1 {
        font-size: 1rem;
        margin-left: 1rem;
    }
`;