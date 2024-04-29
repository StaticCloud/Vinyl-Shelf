import styled from "styled-components";
import like from '../../assets/like.svg'

export const TotalLikes = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5px;

    & > div {
        width: 30px;
        height: 30px;
        background-size: 2.5rem;
        background-position: center;
        background-image: url(${like});
    }
`;