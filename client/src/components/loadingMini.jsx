import styled from "styled-components";
import loading from '../assets/loading.svg';

export const LoadingMini = styled.div`
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
    background-image: url(${loading});
    background-position: center;
    background-size: 2rem;
    animation: rotate 1s linear infinite;
    background-color: ${props => props.theme.primary};

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;