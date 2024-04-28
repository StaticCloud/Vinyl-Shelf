import styled from "styled-components";

export const LoadingWrapper = styled.section`
    width: 100svw;
    height: 100svh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: ${props => props.theme.bg}
`;