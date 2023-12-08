// Function to add an email to the Brevo list
export const addEmailToBrevoList = async (email: string) => {
    const listId = 112; // Replace with your actual list ID

    const requestOptions = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': `${process.env.NEXT_PUBLIC_BREVO_API_KEY}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({ emails: [email] }), // Pass the email as an array
    };

    try {
        const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, requestOptions);
        const data = await response.json();

        // Log the response for debugging
        console.log('Brevo API Response:', data);

        if (!response.ok) {
            console.error('Brevo API Error:', data);
            throw new Error(`Failed to add email to Brevo list. Status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to add email to Brevo list.');
    }
};
