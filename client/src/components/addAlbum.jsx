import styled from "styled-components";
import { useEffect, useState } from "react";
import close from '../../src/assets/add.svg';
import Auth from '../utils/auth';
import { getUserShelves } from "../utils/API";
import { ShelfItem } from "./shelfItem";

const Backdrop = styled.div`
    width: 100svw;
    height: 100svh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: #00000055;
`

const AddAlbumWrapper = styled.div`
    width: 600px;
    height: 85svh;
    border-radius: 1rem;
    background-color: ${props => props.theme.secondary};

    & > h1 {
        text-align: center;
        background-color: ${props => props.theme.secondary};
    }
`

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 1rem;
    background-color: ${props => props.theme.secondary};
`;

const Close = styled.div`
    width: 2rem;
    height: 2rem;
    background-position: center;
    transform: rotate(45deg);
    margin: 0.5rem;
    background-size: 2rem;
    border-radius: 50%;
    background-image: url(${close});

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primary};
    }
`;

const ResultsList = styled.ul`
    list-style-type: none;
`;

export const AddAlbum = ({ albumData, setShowMenu }) => {
    const [userShelves, setUserShelves] = useState([])

    const userShelvesLength = Object.keys(userShelves).length;

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, [])

    useEffect(() => {
        const getShelves = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    return false;
                }

                const response = await getUserShelves(token);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                const shelves = await response.json();
                setUserShelves(shelves)
            } catch (error) {
                console.error(error);
            }
        }

        getShelves()
    }, [userShelvesLength])

    return (
        <Backdrop>
            <AddAlbumWrapper>
                <Header>
                    <Close onClick={() => setShowMenu(false)}/>
                </Header>
                <h1>Add an album to your shelves</h1>
                {userShelves ? (
                    <ResultsList>
                        {/* Prop drilling, yuck */}
                        {userShelves.map((shelf, i) => <ShelfItem key={i} shelf={shelf} albumData={albumData}/>)}
                    </ResultsList>
                ) : (
                    <p>No available shelves.</p>
                )}
            </AddAlbumWrapper>
        </Backdrop>
    );
}