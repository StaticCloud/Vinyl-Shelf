import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from '../utils/auth';
import { getUserShelves } from "../utils/API";
import { ShelfItem } from "./ShelfItem";
import { Backdrop, PopupWrapper, PopupHeader, PopupClose } from "./styled-popup";

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
            <PopupWrapper height={'85svh'}>
                <PopupHeader>
                    <h1>Add an album to your shelves</h1>
                    <PopupClose onClick={() => setShowMenu(false)} />
                </PopupHeader>
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
            </PopupWrapper>
        </Backdrop>
    );
}