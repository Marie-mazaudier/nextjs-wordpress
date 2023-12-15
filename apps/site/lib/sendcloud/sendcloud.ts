// sendcloud.ts
const base64Encode = (str: string) => Buffer.from(str).toString('base64');

export const createParcel = async (parcelData: any) => {
    const url = 'https://panel.sendcloud.sc/api/v2/parcels?errors=verbose-carrier';
    const username = process.env.NEXT_PUBLIC_SEND_CLOUD_PUBLIC_KEY;
    const password = process.env.NEXT_PUBLIC_SEND_CLOUD_SECRET_KEY;
    const authHeader = `Basic ${base64Encode(`${username}:${password}`)}`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Sendcloud-Partner-Id': '', // Set this if you have a partner ID
        },
        body: JSON.stringify({ parcel: parcelData }),
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();

        console.log('Sendcloud API Response:', data);

        if (!response.ok) {
            console.error('Sendcloud API Error:', data);
            throw new Error(`Failed to create parcel. Status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create parcel.');
    }
};
