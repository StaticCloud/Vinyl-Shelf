import Auth from '../utils/auth';
import { useEffect, useState } from 'react';
import { getMe } from '../utils/API';

const Collections = () => {
    const [userData, setUserData] = useState({});

    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
    
                if (!token) {
                    return false;
                }
    
                const response = await getMe(token);
    
                if (!response.ok) {
                    throw new Error('something went wrong!');
                }
    
                const user = await response.json();
                setUserData(user);
            } catch (error) {
                console.error(error);
            }
        }
    
        getUser();
    }, [userDataLength])

    return (
        <></>
    );
}

export default Collections;