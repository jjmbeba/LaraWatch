import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import React from 'react';
import {Genre} from "@/types/genres.types";
import {Badge} from "@/Components/ui/badge";

type Props = {
    movieGenres: Genre[];
    seriesGenres: Genre[];
}

const Index = ({movieGenres, seriesGenres}: Props) => {
    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Genres
            </h2>
        }>
            <Head title={'Genres'}/>
            <GenreList type={'movie'} title={'Movie Genres'} list={movieGenres} />
            <GenreList type={'tv'} title={'Series Genres'} list={seriesGenres} />
        </AuthenticatedLayout>
    )
}

const GenreList = ({title, list, type} : {title:string; list:Genre[]; type: 'movie' | 'tv'}) => {
    return (
        <div className={'mt-5'}>
            <h2 className={'font-semibold text-xl'}>
                {title}
            </h2>
            <div className={'space-x-4 space-y-3'}>
                {list.map(({id, name}) => (
                    <a href={route('genres.index', {
                        type,
                        genre:id
                    })} key={id}>
                        <Badge className={'mt-3'}>
                            {name}
                        </Badge>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Index;
