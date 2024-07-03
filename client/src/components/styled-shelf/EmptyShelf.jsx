import styled from "styled-components";
import profile from '../../assets/profile.svg'

export const EmptyShelf = styled.div`
    flex-grow: 1;
    background-position: center;
    background-size: 3rem;
    background-image: url(${profile});
`;