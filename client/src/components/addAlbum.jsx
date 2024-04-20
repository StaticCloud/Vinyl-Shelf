import styled from "styled-components";
import { Link } from "react-router-dom";
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
    overflow-y: scroll;
    position: relative;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem 1rem 0 0;
    background-color: ${props => props.theme.primary};
    position: fixed;
    width: 600px;

    & > h1 {
        margin-left: 1rem;
    }
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
        background-color: ${props => props.theme.secondary};
    }
`;

const ResultsList = styled.ul`
    list-style-type: none;

    li:first-child {
        padding-top: 3rem;
    }
`;

const CenteredContent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        color: ${props => props.theme.fg}
    }
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
                    <h1>Add an album to your shelves</h1>
                    <Close onClick={() => setShowMenu(false)} />
                </Header>
                {userShelves.length ? (
                    <ResultsList>
                        {/* Prop drilling, yuck */}
                        {userShelves.map((shelf, i) => <ShelfItem key={i} shelf={shelf} albumData={albumData} />)}
                    </ResultsList>
                ) : (
                    <CenteredContent>
                        <p>No available shelves. Click <Link to='/new_shelf'>here</Link> to create one.</p>
                    </CenteredContent>
                )}
            </AddAlbumWrapper>
        </Backdrop>
    );
}