import styled from "styled-components";
import search_light from '../../assets/search_light.svg'

export const SubmitSearch = styled.input`
    background-color: ${props => props.theme.secondary};
    display: block;
    width: 41.4px;
    height: 41.4px;
    background-position: center;
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-size: 2.5rem;
    background-image: url(${search_light});
    outline: none;
    border-radius: 0 5rem 5rem 0;

    &:hover {
        cursor: pointer;
    }
`;