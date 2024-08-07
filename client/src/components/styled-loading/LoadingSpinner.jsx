import styled from "styled-components"
import loading from '../../assets/vinyl_record.svg'

export const LoadingSpinner = styled.div`
    min-width: 50px;
    min-height: 50px;
    border-radius: 50px;
    background-image: url(${loading});
    background-position: center;
    background-size: 3rem;
    animation: rotate 1s linear infinite;

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`