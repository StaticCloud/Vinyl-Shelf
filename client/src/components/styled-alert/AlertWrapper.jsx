import styled from "styled-components";

export const AlertWrapper = styled.div`
    width: 100svw;
    position: fixed;
    left: 0;
    bottom: -40px;
    animation-name: mount;
    animation-duration: 5s;

    @keyframes mount {
        0%   { bottom: -40px; }
        5%  { bottom: 60px; }
        95%  { bottom: 60px;}
        100% { bottom: -40px; }
    }
`;