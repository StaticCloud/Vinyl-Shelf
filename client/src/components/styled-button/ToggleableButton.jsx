import styled from "styled-components"

const ToggleableButton = styled.div`
    display: flex;
    padding: 10px 20px;
    margin: 0 5px 5px 0;
    align-items: center;
    justify-content: center;
    border-radius: 50px;

    &:hover {
        cursor: pointer;
    }

    color: ${props => props.selected === true ? props.theme.bg : props.theme.fg};
    font-weight: ${props => props.selected === true ? "bold" : "regular"};
    background-color: ${props => props.selected === true ? props.theme.fg : props.theme.secondary};
`

export default ToggleableButton;