import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from '../utils/auth';
import { getUserShelves } from "../utils/API";
import ShelfPreviewMini from "./ShelfPreviewMini";
import { LoadingSpinner } from "./styled-loading";
import { Backdrop, PopupWrapper, PopupHeader, PopupClose, PopupCentered, PopupList } from "./styled-popup";

const AddAlbum = ({ albumData, setShowMenu }) => {
    const [userShelves, setUserShelves] = useState([])
    const [loadingShelves, setLoadingShelves] = useState(true);

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
                setLoadingShelves(false)
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
                {!loadingShelves ? (
                    <>
                        {userShelves.length ? (
                            <PopupList>
                                {/* Prop drilling, yuck */}
                                {userShelves.map((shelf, i) => <ShelfPreviewMini key={i} shelf={shelf} albumData={albumData} />)}
                            </PopupList>
                        ) : (
                            <PopupCentered difference={"48px"}>
                                <p>No available shelves. Click <span><b><Link to='/new-shelf'>here</Link></b></span> to create one.</p>
                            </PopupCentered>
                        )}
                    </>
                ) : (
                    <PopupCentered difference={"48px"}>
                        <LoadingSpinner></LoadingSpinner>
                    </PopupCentered>
                )}

            </PopupWrapper>
        </Backdrop>
    );
}

export default AddAlbum;