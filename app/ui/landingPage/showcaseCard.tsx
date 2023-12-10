import React from 'react'
import Image from 'next/image';

interface ShowcaseCardProps {
    title: string;
    subtitle: string;
    imgSrc: string;

}
const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ title, subtitle, imgSrc }) => {
    return (
        <div className='flex flex-col mt-20 mx-10 p-6 bg-blue-100 shadow-md block rounded justify-center px-14 items-center space-x-4 w-[100%]'>
            <div className='flex flex-col space-y-4 '>
                <Image src={imgSrc} alt='product'
                    className="h-auto w-100" objectFit='cover' height={512} width={512}></Image>
                <div className='text-2xl font-bold text-black'>{title}</div>
                <div className='text-lg font-semibold text-grey-800'>{subtitle}</div>

            </div>
        </div>
    )
}

export default ShowcaseCard