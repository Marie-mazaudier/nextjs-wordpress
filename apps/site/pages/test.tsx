import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// rendre cette page accessible uniquement aux utilisateurs admin connectés
const TestPage = () => {
    const router = useRouter();
    const [labelId, setLabelId] = useState<string>('');

    useEffect(() => {
        // Vérifiez si l'ID du label est présent dans l'URL
        if (router.isReady && router.query.labelId) {
            const labelIdFromUrl = router.query.labelId as string;
            setLabelId(labelIdFromUrl);
            downloadLabel(labelIdFromUrl);
        }
    }, [router.isReady, router.query.labelId]);

    const downloadLabel = (labelId: string) => {
        window.open(`/api/sendcloud/sendcloud?type=download_label&labelId=${labelId}`, '_blank');
    };

    return (
        <div>
            <h2>Télécharger le Label</h2>
            {labelId ? (
                <button onClick={() => downloadLabel(labelId)}>Télécharger le Label</button>
            ) : (
                <p>Label ID non trouvé</p>
            )}
        </div>
    );
};

export default TestPage;
