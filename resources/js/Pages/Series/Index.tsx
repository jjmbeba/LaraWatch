import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from "@inertiajs/react";
import {Series} from "@/types/series.types";
import Banner from "@/Components/Banner";
import ListCarousel from "@/Components/ListCarousel";
import {BookmarkRecord} from "@/types/bookmarks.types";

type Props = {
    trendingSeries:Series[],
    popularSeries:Series[],
    topRatedSeries:Series[],
    bookmarkedSeries:BookmarkRecord[]
}

const Index = ({trendingSeries, popularSeries, topRatedSeries, bookmarkedSeries}:Props) => {
    console.log(bookmarkedSeries);
    return (
        <AuthenticatedLayout header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Tv Series
            </h2>
        }>
            <Head title={'Tv Series'}/>
            <Banner id={trendingSeries[0]?.id} type={'series'} title={trendingSeries[0]?.name} imageUrl={trendingSeries[0]?.backdrop_path} description={trendingSeries[0]?.overview} showDetails />
            <ListCarousel bookmarkedRecords={bookmarkedSeries} title={'Trending Series'} list={trendingSeries.slice(1)} />
            <ListCarousel bookmarkedRecords={bookmarkedSeries} title={'Popular Series'} list={popularSeries} />
            <ListCarousel bookmarkedRecords={bookmarkedSeries} title={'Top Rated Series'} list={topRatedSeries} />
        </AuthenticatedLayout>
    )
}

export default Index;
