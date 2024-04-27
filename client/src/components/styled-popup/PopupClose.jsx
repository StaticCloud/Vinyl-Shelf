import styled from "styled-components";
import close from '../../assets/add.svg'

export const PopupClose = styled.div`
    width: 2rem;
    height: 2rem;
    background-position: center;
    transform: rotate(45deg);
    margin: 0.5rem;
    background-size: 2rem;
    border-radius: 50%;
    background-image: url(${close});

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primary};
    }
`;