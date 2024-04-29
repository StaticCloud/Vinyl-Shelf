import styled from "styled-components";

export const InlineIcon = styled.span`
    display: inline-block;
    min-width: 30px;
    height: 30px;
    margin: 3px;
    background-position: center;
    background-size: 1.8rem;
    background-image: url(${props => props.icon});
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
`;