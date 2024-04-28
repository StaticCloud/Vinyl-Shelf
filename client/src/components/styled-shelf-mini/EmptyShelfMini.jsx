import styled from "styled-components";
import profile_light from '../../assets/profile_light.svg'

export const EmptyShelfMini = styled.div`
    flex-grow: 1;
    border-radius: 20%;
    background-position: center;
    background-size: 2rem;
    background-image: url(${profile_light});
`;