import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from "@inertiajs/react";
import ListCarousel from "@/Components/ListCarousel";
import Banner from "@/Components/Banner";
import {Movie} from "@/types/movies.types";
import {BookmarkRecord} from "@/types/bookmarks.types";

type Props = {
    trendingMovies: Movie[],
    popularMovies: Movie[],
    topRatedMovies: Movie[]
    bookmarkedMovies: BookmarkRecord[]
}

const Index = ({trendingMovies, popularMovies, topRatedMovies, bookmarkedMovies}: Props) => {

    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Movies
            </h2>
        }>
            <Head title={'Movies'}/>
            <Banner id={trendingMovies[0]?.id} type={'movies'} showDetails title={trendingMovies[0]?.title} imageUrl={trendingMovies[0]?.backdrop_path}
                    description={trendingMovies[0]?.overview}/>
            <ListCarousel bookmarkedRecords={bookmarkedMovies} title={'Trending Movies'} list={trendingMovies.slice(1)}/>
            <ListCarousel bookmarkedRecords={bookmarkedMovies} title={'Popular Movies'} list={popularMovies}/>
            <ListCarousel bookmarkedRecords={bookmarkedMovies} title={'Top Rated Movies'} list={topRatedMovies}/>
        </AuthenticatedLayout>
    )
}

export default Index;
