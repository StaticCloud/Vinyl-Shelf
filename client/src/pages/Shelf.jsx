import { useParams } from "react-router-dom";
import { getShelf } from "../utils/API";
import { useEffect, useState } from "react";

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
        <></>
    );
}

export default Shelf;