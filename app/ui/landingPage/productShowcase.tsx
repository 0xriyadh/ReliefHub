import React from 'react'
import Image from 'next/image';

interface ProductShowcaseProps {
    title: string;
    subtitle: string;
    imgSrc: string;
    isReverse: boolean;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ title, subtitle, imgSrc, isReverse }) => {
    return (
        <div className={`flex ${isReverse ? 'flex-row-reverse' : 'flex-row'} mt-20 justify-between px-14 items-center space-x-8`}>
            <div className='flex flex-col space-y-4 w-1/2'>
                <div className='text-2xl font-bold text-black'>{title}</div>
                <div className='text-lg font-semibold text-grey-800'>{subtitle}</div>
            </div>

            <Image src={imgSrc} alt='product' objectFit='cover' className='w-1/2' height={512} width={512}></Image>
        </div>
    );
}

export default ProductShowcase;