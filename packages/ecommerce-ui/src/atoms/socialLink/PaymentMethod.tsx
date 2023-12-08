import Image from 'next/image';
import React from 'react';

interface PaymentMethodProps {
    img1?: any,
    img2?: any,
    img3?: any,
    img4?: any,
    className?: string
}

export const PaymentMethod = ({ img1 = '/paypal.png', img2 = '/visa.png', img3 = '/mastercard.png', img4 = '/cash.png', className = '' }: PaymentMethodProps) => {
    return (
        <div className='flex gap-2'>
            <>
                <Image
                    src={img1}
                    alt="Logo"
                    width={60}
                    className='cursor-pointer'
                    height={32}
                />
            </>
            <>
                <Image
                    src={img2}
                    alt="Logo"
                     className='cursor-pointer'
                    width={60}
                    height={32}
                />
            </>
            <>
                <Image
                    src={img3}
                    alt="Logo"
                     className='cursor-pointer'
                    width={60}
                    height={32}
                />
            </>
            <>
                <Image
                    src={img4}
                    alt="Logo"
                     className='cursor-pointer'
                    width={60}
                    height={32}
                />
            </>
        </div>
    );
};
