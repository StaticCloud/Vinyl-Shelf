import { useParams } from "react-router-dom";
import { getShelf } from "../utils/API";
import { useEffect, useState } from "react";
import styled from "styled-components";
import trash from '../assets/trash.svg';
import Auth from "../utils/auth";
import { ConfirmDelete } from "../components/confirmDelete";
import search_light from '../assets/search_light.svg';

const ShelfWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;
`;

const ShelfHeader = styled.div`
    & > h1 {
        font-size: 3rem;
        margin-bottom: .5rem;
    }
`;

const Vinyls = styled.ul`
    list-style-type: none;
`;

const Vinyl = styled.li`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    & > h1 {
        margin-left: 20px;
        font-size: 1.3rem;
    }
`

const Cover = styled.div`
    border-radius: 1rem;
    min-width: 80px;
    height: 80px;
    display: block;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.cover});
`

const SettingsTab = styled.div`
    margin-bottom: 2rem;
`;

const SettingsButton = styled.div`
    width: 40px;
    height: 40px;
    background-size: 2rem;
    border-radius: 50%;
    background-position: center;
    background-image: url(${props => props.icon});
    background-color: ${props => props.theme.primary};

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.secondary};
    }
`;

const EmptyShelvesWrapper = styled.div`
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        display: flex;
        align-items: center;
    }
`;

const InlineIcon = styled.span`
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 3px;
    background-position: center;
    background-size: 1.8rem;
    background-image: url(${search_light});
    background-color: ${props => props.theme.primary};
    border-radius: 50%;
`;

const Shelf = () => {
    const { id } = useParams();
    const [shelfData, setShelfData] = useState([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const shelfDataLength = Object.keys(shelfData).length;

    useEffect(() => {
        const getShelfData = async () => {
            try {
                const response = await getShelf(id);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                const shelf = await response.json();

                setShelfData(shelf)
            } catch (error) {
                console.error(error);
            }
        }

        getShelfData();
    }, [shelfDataLength])

    return (
        <ShelfWrapper>
            <ShelfHeader>
                <h1>{shelfData.name}</h1>
                {Auth.getProfile().data.id == shelfData.user_id ? (
                    <SettingsTab>
                        <SettingsButton onClick={() => setShowConfirmDelete(true)} icon={trash}></SettingsButton>
                    </SettingsTab>
                ) : (
                    <></>
                )}
            </ShelfHeader>
            <Vinyls>
                {shelfData?.vinyl_on_shelf?.length ? (
                    <>
                        {shelfData.vinyl_on_shelf?.map(({ vinyl }, i) =>
                            <Vinyl key={i}>
                                <Cover cover={vinyl.cover_image}></Cover>
                                <h1>{vinyl.title}</h1>
                            </Vinyl>
                        )}
                    </>
                ) : (
                    <>
                        <EmptyShelvesWrapper>
                            <p>This shelf is empty. Search <InlineIcon></InlineIcon> for records to add to your shelf.</p>
                        </EmptyShelvesWrapper>
                    </>
                )}

            </Vinyls>
            {showConfirmDelete ? (
                <ConfirmDelete auth={Auth} shelfData={shelfData} setShowConfirmDelete={setShowConfirmDelete} />
            ) : (
                <></>
            )}
        </ShelfWrapper>
    );
}

export default Shelf;