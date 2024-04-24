import styled from "styled-components";
import close from '../../src/assets/add.svg';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { deleteShelf } from '../utils/API';
import Auth from "../utils/auth";

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

const ConfirmDeleteWrapper = styled.div`
    width: 600px;
    height: auto;
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
    background-color: ${props => props.theme.secondary};
    position: fixed;
    width: 600px;

    & > h1 {
        font-size: 1rem;
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
        background-color: ${props => props.theme.primary};
    }
`;

const AlertBody = styled.div`
    margin: 60px 20px 0 20px;

    p {
        font-size: 1rem;
        margin-bottom: 3rem;
    }
`;

const AlertButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    justify-content: flex-end;
`;

const AlertButton = styled.div`
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.primary};
    }
    
    text-align: center;
    padding: 1rem;
    margin: 2px;
    border-radius: 1rem;

    background-color: ${props => props.theme.secondary};
`;

export const ConfirmDelete = ({ auth, setShowConfirmDelete, shelfData }) => {

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, [])

    const handleDeleteShelf = async () => {
        try {
            const token = auth.loggedIn() ? auth.getToken() : null;

            if (!token) {
                return false;
            }

            const response = await deleteShelf(token, shelfData.id);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            navigate(`/user/${Auth.getProfile().data.id}`)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Backdrop>
            <ConfirmDeleteWrapper>
                <Header>
                    <h1>Delete Shelf</h1>
                    <Close onClick={() => setShowConfirmDelete(false)} />
                </Header>
                <AlertBody>
                    <p>Are you sure you want to delete <b>{shelfData.name}</b>?</p>
                    <AlertButtonWrapper>
                        <AlertButton onClick={() => handleDeleteShelf()}>
                            Delete
                        </AlertButton>
                        <AlertButton onClick={() => setShowConfirmDelete(false)}>
                            Cancel
                        </AlertButton>
                    </AlertButtonWrapper>
                </AlertBody>
            </ConfirmDeleteWrapper>
        </Backdrop>
    );
}