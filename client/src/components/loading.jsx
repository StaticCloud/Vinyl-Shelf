import styled from 'styled-components';
import loading from '../assets/loading.svg'

const LoadingWrapper = styled.section`
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

const LoadingSpinner = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-image: url(${loading});
    background-position: center;
    background-size: 3rem;
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

`

export const Loading = () => {
    return (
        <LoadingWrapper>
            <LoadingSpinner></LoadingSpinner>
        </LoadingWrapper>
    )
}