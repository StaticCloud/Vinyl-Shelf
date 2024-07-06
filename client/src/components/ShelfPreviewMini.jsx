/* eslint-disable react/prop-types */
import { LoadingMini, LoadingWrapper } from "./styled-loading";
import { useEffect, useState } from "react";
import { createVinyl, addToShelf, removeFromShelf } from "../utils/API";
import { MiniShelfPreviewLi, MiniShelfPreviewContents, AddVinylToShelf, AlbumMini, EmptyShelfMini } from "./styled-shelf-mini";

export const ShelfPreviewMini = ({ shelf, albumData }) => {
    const [inShelf, setInShelf] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        shelf.vinyls_on_shelf.forEach((vinyl) => {
            // check if album already exists in collection
            if (vinyl.vinyl_id == albumData.id) {
                setInShelf(true);
            }
        })
    }, [])

    const handleUpdateShelf = async () => {
        setLoading(true)

        try {
            await createVinyl(albumData)
        } catch (error) {
            console.log('')
        }

        const payload = {
            shelfId: shelf.id,
            vinylId: albumData.id
        }

        if (inShelf == false) {
            await addToShelf(payload)
        } else {
            await removeFromShelf(payload)
        }

        setLoading(false)
        setInShelf(!inShelf)
    }

    return (
        <MiniShelfPreviewLi>
            <MiniShelfPreviewContents>
                {shelf.vinyls_on_shelf.length ? (
                    (shelf.vinyls_on_shelf.length < 4) ? (
                        <AlbumMini cover={shelf.vinyls_on_shelf[0].vinyl.cover_image} />
                    ) : (
                        <>
                            <AlbumMini cover={shelf.vinyls_on_shelf[0].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyls_on_shelf[1].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyls_on_shelf[2].vinyl.cover_image} />
                            <AlbumMini cover={shelf.vinyls_on_shelf[3].vinyl.cover_image} />
                        </>
                    )
                ) : (
                    <EmptyShelfMini/>
                )}
            </MiniShelfPreviewContents>
            <p>{shelf.name}</p>
            {!loading ? (
                <AddVinylToShelf inshelf={inShelf.toString()} onClick={() => handleUpdateShelf()} />
            ) : (
                <LoadingMini />
            )}
        </MiniShelfPreviewLi>
    );
}