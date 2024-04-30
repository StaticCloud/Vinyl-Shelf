import { useState } from "react";
import { Cover, VinylInfo, AddToShelfButton } from "./styled-vinyl";
import { AddAlbum } from "./AddAlbum";
import Auth from "../utils/auth";

export const VinylSearchResult = ({ album }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <Cover cover={album.cover_image} />
            <VinylInfo>
                <div>
                    <b><p>{album.title}</p></b>
                    <p>{album.year}</p>
                </div>
            </VinylInfo>
            {Auth.loggedIn() ? (
                <AddToShelfButton onClick={() => setShowMenu(true)} />
            ) : (
                <></>
            )}
            {showMenu ? (
                <AddAlbum albumData={album} setShowMenu={setShowMenu} />
            ) : (
                <></>
            )}
        </>
    );
}