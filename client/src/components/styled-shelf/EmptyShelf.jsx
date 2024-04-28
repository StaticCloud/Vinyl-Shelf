import styled from "styled-components";
import profile_light from '../../assets/profile_light.svg'

export const EmptyShelf = styled.div`
    flex-grow: 1;
    background-position: center;
    background-size: 3rem;
    background-image: url(${profile_light});
`;