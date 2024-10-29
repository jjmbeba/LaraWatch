import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import {Head} from "@inertiajs/react";
import {Movie, MovieDetail} from "@/types/movies.types";
import PageTitle from "@/Components/PageTitle";
import Banner from "@/Components/Banner";
import {Collection} from "@/types/collections.types";
import ListCarousel from "@/Components/ListCarousel";
import PageDetail from "@/Components/PageDetail";

type Props = {
    movie: MovieDetail,
    collection:Collection | null,
    recommendations:Movie[],
    isBookmarked:boolean
}

const Show = ({movie, collection, recommendations, isBookmarked}: Props) => {
    return (
        <AuthenticatedLayout header={
            <PageTitle title={movie.title} />
        }>
            <Head title={movie.title}/>
            <Banner id={movie.id} type={'movies'} title={movie.title} description={movie.overview} imageUrl={movie.backdrop_path || movie.poster_path} />
            <PageDetail item={movie} isBookmarked={isBookmarked} />
            {collection !== null && <div className={'mt-24'}>
                <h2 className={'font-bold text-3xl'}>
                    {collection.name}
                </h2>
                <p className={'mt-5 max-w-4xl text-md opacity-80 font-semibold'}>
                    {collection.overview}
                </p>
                <ListCarousel list={collection.parts}/>
            </div>}
            {recommendations.length > 0 && (
                <div className={'mt-10'}>
                    <h2 className={'font-bold text-3xl'}>
                        Recommendations
                    </h2>
                    <ListCarousel list={recommendations} />
                </div>
            )}
        </AuthenticatedLayout>
    )
}

export default Show;
