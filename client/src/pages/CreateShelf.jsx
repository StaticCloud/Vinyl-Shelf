import { FormWrapper } from '../components/formWrapper';
import { StyledForm } from '../components/form';
import { useState } from 'react';
import { createShelf } from '../utils/API';
import Auth from '../utils/auth';

const NewCollection = () => {
    const [shelfData, setCollectionData] = useState({ name: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCollectionData({ ...shelfData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if (!token) {
                return false;
            }

            const response = await createShelf(token, shelfData);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleFormSubmit}>
                <h1>New Shelf</h1>

                <input name="name"
                    id="name"
                    placeholder="Enter a name for your shelf..."
                    onChange={handleInputChange}
                    value={shelfData.name} />

                <input type="submit" value="Create Shelf" disabled={!(shelfData.name)} />
            </StyledForm>
        </FormWrapper>
    );
}

export default NewCollection;