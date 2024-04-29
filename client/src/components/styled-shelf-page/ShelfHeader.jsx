import styled from "styled-components";
import { ProfileHeader } from "../styled-profile-page";

export const ShelfHeader = styled(ProfileHeader)`
    & > h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 1rem;
        font-weight: normal;
    }

    & > h2 {
        margin-bottom: 1rem;
    }

    a {
        font-weight: bold;
        text-decoration: none;
        color: ${props => props.theme.fg};
    }
`;