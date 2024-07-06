import { Link } from "react-router-dom"
import { EmptyShelf, ShelfPreviewContents, AlbumRegular, ShelfInfo } from "./styled-shelf";

export const ShelfPreview = ({ shelf }) => {
    return (
        <Link to={`/shelf/${shelf.id}`}>
            <ShelfPreviewContents>
                {shelf.vinyls_on_shelf.length ? (
                    (shelf.vinyls_on_shelf.length < 4) ? (
                        <AlbumRegular cover={shelf.vinyls_on_shelf[0].vinyl.cover_image} />
                    ) : (
                        <>
                            <AlbumRegular cover={shelf.vinyls_on_shelf[0].vinyl.cover_image} />
                            <AlbumRegular cover={shelf.vinyls_on_shelf[1].vinyl.cover_image} />
                            <AlbumRegular cover={shelf.vinyls_on_shelf[2].vinyl.cover_image} />
                            <AlbumRegular cover={shelf.vinyls_on_shelf[3].vinyl.cover_image} />
                        </>
                    )
                ) : (
                    <EmptyShelf />
                )}
            </ShelfPreviewContents>
            <ShelfInfo>
                <b><p>{shelf?.name}</p></b>
                <p>{shelf?.user?.username}</p>
            </ShelfInfo>
        </Link>
    );
}