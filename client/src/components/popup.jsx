import styled from 'styled-components';

const PopupWrapper = styled.div`
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

const PopupContent = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: ${props => props.theme.primary};
`;

export const Popup = ({ text }) => {
    return (
        <PopupWrapper>
            <PopupContent>
                <p>{text}</p>
            </PopupContent>
        </PopupWrapper>
    );
}