import styled from "styled-components";
import add from '../../assets/add.svg'
import check from '../../assets/check.svg'

export const AddVinylToShelf = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(${props => props.inshelf === 'false' ? add : check});
    background-position: center;
    background-size: 2rem;
    background-color: ${props => props.inshelf === 'false' ? props.theme.primary : 'green'};

    &:hover {
        cursor: pointer;
    }
`;