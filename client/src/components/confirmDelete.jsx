import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { deleteShelf } from '../utils/API';
import { Backdrop, PopupWrapper, PopupHeader, PopupClose, PopupParagraphBody, PopupButtonWrapper, PopupButton } from "./styled-popup";

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

            navigate(`/user/${auth.getProfile().data.id}?delete-success=true`)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Backdrop>
            <PopupWrapper height={"auto"}>
                <PopupHeader>
                    <h1>Delete Shelf</h1>
                    <PopupClose onClick={() => setShowConfirmDelete(false)} />
                </PopupHeader>
                <PopupParagraphBody>
                    <p>Are you sure you want to delete <b>{shelfData.name}</b>?</p>
                    <PopupButtonWrapper>
                        <PopupButton onClick={() => handleDeleteShelf()}>
                            Delete
                        </PopupButton>
                        <PopupButton onClick={() => setShowConfirmDelete(false)}>
                            Cancel
                        </PopupButton>
                    </PopupButtonWrapper>
                </PopupParagraphBody>
            </PopupWrapper>
        </Backdrop>
    );
}