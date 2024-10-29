import React from 'react';
import {generateImageUrl} from "@/functions";

type Props = {
    title: string;
    description: string;
    imageUrl: string;
    showDetails?:boolean;
    id:number;
    type: 'series' | 'movies';
}

const Banner = ({id, type, title, description, imageUrl, showDetails = false}: Props) => {
    return (
        <div className={'relative w-full h-[50dvh]'}>
            <img src={generateImageUrl(imageUrl)}
                 className={'absolute rounded-lg w-full h-full object-cover'}
                 alt={title}/>
            {showDetails && <div className={'absolute z-10 bottom-20 left-10 invert'}>
                <a href={`/${type}/${id}`} className={'font-bold text-2xl hover:underline'}>
                    {title}
                </a>
                <p className={'mt-2 text-sm max-w-[70%]'}>
                    {description}
                </p>
            </div>}
        </div>
    )
}

export default Banner;
