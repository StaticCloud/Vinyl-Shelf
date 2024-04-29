import styled from "styled-components";

export const Backdrop = styled.div`
    width: 100svw;
    height: 100svh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: #00000055;
    animation-name: fade-in;
    animation-duration: .5s;

    @keyframes fade-in {
        from {
            opacity: 0;
            
        }

        to {
            opacity: 1;
        }
    }
`