import { useParams } from "react-router-dom";
import { getShelf } from "../utils/API";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ShelfWrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;
`;

const ShelfHeader = styled.div`
    & > h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
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
    }
`

const Cover = styled.div`
    border-radius: 1rem;
    width: 90px;
    height: 90px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.cover});
`

const Shelf = () => {
    const { id } = useParams();
    const [shelfData, setShelfData] = useState([]);

    const shelfDataLength = Object.keys(shelfData).length;

    console.log(shelfData)

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
            </ShelfHeader>
            <Vinyls>
                {shelfData.vinyl_on_shelf?.map(({ vinyl }, i) => 
                    <Vinyl key={i}>
                        <Cover cover={vinyl.cover_image}></Cover>
                        <h1>{vinyl.title}</h1>
                    </Vinyl>
                )}
            </Vinyls>
        </ShelfWrapper>
    );
}

export default Shelf;