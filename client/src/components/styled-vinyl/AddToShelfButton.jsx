import styled from 'styled-components';
import add from '../../assets/add.svg'

export const AddToShelfButton = styled.div`
    min-width: 40px;
    height: 40px;
    background-image: url(${add});
    background-position: center;
    background-size: 2rem;
    background-color: ${props => props.theme.secondary};
    border-radius: 50%;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primary};
    }
`;