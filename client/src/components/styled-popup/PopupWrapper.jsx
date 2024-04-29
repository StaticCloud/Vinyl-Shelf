import styled from "styled-components"

export const PopupWrapper = styled.div`
    width: 600px;
    height: ${props => props.height};
    border-radius: 1rem;
    background-color: ${props => props.theme.secondary};
    overflow-y: scroll;
    position: relative;
    animation-name: pop-up;
    animation-duration: .5s;

    @keyframes pop-up {
        from {
            margin-top: 3rem;
            opacity: 0;
            
        }

        to {
            margin-top: 0;
            opacity: 1;
        }
    }
`