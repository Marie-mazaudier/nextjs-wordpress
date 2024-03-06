// lib/paymentError.ts

async function updateOrderStatus(orderId: string, status: 'pending' | 'failed'): Promise<any> {
    try {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.error || "Erreur lors de la mise à jour du statut de la commande");
        }

        return data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de la commande:", error);
        throw error;
    }
}

export default updateOrderStatus;
