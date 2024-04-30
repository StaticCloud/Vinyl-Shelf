import styled from "styled-components";

export const EmptyShelves = styled.div`
    height: ${props => props.height};
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
`;