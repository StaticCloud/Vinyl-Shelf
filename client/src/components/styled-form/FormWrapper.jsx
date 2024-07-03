import styled from 'styled-components';

export const FormWrapper = styled.div`
    text-align: center;
    width: 100vw;
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;

    a,
    a:visited {
        color: ${props => props.theme.fg};
        text-decoration: none;
        display: inline-block;
        border-bottom: 1px solid ${props => props.theme.fg};
        margin: 1rem;
    }

    @media screen and (min-width: 768px) { 
        width: calc(100% - 60px);
    }
`;