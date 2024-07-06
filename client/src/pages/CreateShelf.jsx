import { FormWrapper, Form } from '../components/styled-form'
import { useState } from 'react';
import { createShelf } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const NewCollection = () => {
    // Create a state object that stores the name of the new shelf.
    const [shelfData, setShelfData] = useState({ name: '' });

    // Create a new navigate function from the useNavigate hook.
    const navigate = useNavigate();

    // Update the shelfData object when the text input changes.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShelfData({ ...shelfData, [name]: value });
    };

    // Submit the new shelf to the API.
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Get the authenticated user's info.
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            // If there is no token, return false.
            if (!token) {
                return false;
            }

            // Make a call to the API using the token and the shelf data.
            const response = await createShelf(token, shelfData);

            // If the response fails, throw an error.
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // If the request was successful, redirect to the user's profile with an "add-success" query parameter.
            navigate(`/user/${Auth.getProfile().data.id}?add-success=true`)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormWrapper>
            <Form onSubmit={handleFormSubmit}>
                <h1>Create a New Shelf</h1>

                <input name="name"
                    id="name"
                    maxLength={30}
                    placeholder="Enter a name for your shelf..."
                    onChange={handleInputChange}
                    value={shelfData.name} />

                <input type="submit" value="Create Shelf" disabled={!(shelfData.name)} />
            </Form>
        </FormWrapper>
    );
}

export default NewCollection;