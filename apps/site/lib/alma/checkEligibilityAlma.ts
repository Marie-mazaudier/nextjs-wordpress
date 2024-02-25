import axios from 'axios';

export async function checkEligibilityAlma(purchaseAmount: number) {
    try {
        const response = await axios.post('/api/payments/eligibility-alma', { purchaseAmount });
        return response.data;
    } catch (error) {
        console.error('Error checking Alma eligibility:', error);
        throw error;
    }
}
