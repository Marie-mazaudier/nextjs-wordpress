import React, { useEffect } from 'react';
import Head from 'next/head';
//IMPORT DATA GRAPHQL
/*Menu*/
import { HocMenuData } from "lib/graphQL/menu/HocMenuData";
declare global {
    interface Window {
        dalenys: any;
    }
}

const PaymentPage = () => {
    useEffect(() => {
        const style = {
            "input": {
                "font-size": "1em",
            },
            "::placeholder": {
                "font-size": "1em",
                "color": "#777",
                "font-style": "italic"
            }
        };

        const hfields = window.dalenys?.hostedFields({
            key: {
                id: process.env.NEXT_PUBLIC_IDENTIFER_PAYPAL, // Assurez-vous que cette valeur est correcte
                value: process.env.NEXT_PUBLIC_API_KEY_ID // Utilisez la clé API publique ici
            },
            fields: {
                'card': {
                    id: 'card-container',
                    placeholder: '•••• •••• •••• ••••',
                    enableAutospacing: true,
                    style: style
                },
                'expiry': {
                    id: 'expiry-container',
                    placeholder: 'MM/YY',
                    style: style
                },
                'cryptogram': {
                    id: 'cvv-container',
                    style: style
                }
            }
        });

        hfields.load();
    }, []);

    const tokenizeHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        window.dalenys?.hostedFields?.createToken((result: any) => {
            if (result.execCode === '0000') {
                const tokenInput = document.getElementById("hf-token") as HTMLInputElement;
                tokenInput.value = result.hfToken;
                showTokenModal(result.hfToken);
            } else {
                console.error(result.execCode + ': ' + result.message);
            }
        });
    };

    const showTokenModal = (token: string) => {
        const modal = document.getElementById("modal");
        const modalTokenInput = document.getElementById("modal-hf-token") as HTMLInputElement;
        if (modal && modalTokenInput) {
            modal.style.display = "block";
            modalTokenInput.value = token;
        }
    };

    const hideTokenModal = () => {
        const modal = document.getElementById("modal");
        if (modal) {
            modal.style.display = "none";
        }
    };

    return (
        <>
            <Head>
                <script type="text/javascript" src="https://js.sandbox.dalenys.com/hosted-fields/v2.0.0/hosted-fields.min.js"></script>
            </Head>

            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <form id="payment-form" method="post" name="dalenysForm" onSubmit={tokenizeHandler} className="space-y-4">
                    <div>
                        <label htmlFor="card-container" className="block text-sm font-medium text-gray-700">
                            Card number
                        </label>
                        <span id="card-container" className="input-container" />
                    </div>
                    <div>
                        <label htmlFor="expiry-container" className="block text-sm font-medium text-gray-700">
                            Expiry
                        </label>
                        <span id="expiry-container" className="input-container" />
                    </div>
                    <div>
                        <label htmlFor="cvv-container" className="block text-sm font-medium text-gray-700">
                            CVV
                        </label>
                        <span id="cvv-container" className="input-container" />
                    </div>
                    <div>
                        <input type='submit' value='Pay' className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
                    </div>
                    <input type="hidden" name="hf-token" id="hf-token" />
                </form>
            </div>

            <div id="modal" className="hidden">
                <p>
                    <label>Generated token</label>
                    <input type="text" id="modal-hf-token" />
                </p>
                <p className="center">
                    <button onClick={() => hideTokenModal()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Copy and close</button>
                </p>
            </div>
        </>
    );
};

export default PaymentPage;

export const getStaticProps = HocMenuData(async (context) => {
    return {
        props: {

        },
    }
})