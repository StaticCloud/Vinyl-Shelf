import styled from 'styled-components';

export const Cover = styled.div`
    min-width: 80px;
    height: 80px;
    background-size: cover;
    border-radius: 0.5rem;
    background-image: url(${props => props.cover});
    background-color: ${props => props.theme.primary};
`