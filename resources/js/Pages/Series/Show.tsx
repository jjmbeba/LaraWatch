import React from 'react';
import {Series, SeriesDetail} from "@/types/series.types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageTitle from "@/Components/PageTitle";
import {Head} from "@inertiajs/react";
import Banner from "@/Components/Banner";
import PageDetail from "@/Components/PageDetail";
import ListCarousel from "@/Components/ListCarousel";
import {BookmarkRecord} from "@/types/bookmarks.types";

type Props = {
    series: SeriesDetail,
    recommendations: Series[],
    isBookmarked:boolean,
    bookmarkedSeries:BookmarkRecord[]
}

const Show = ({series, recommendations, isBookmarked, bookmarkedSeries}: Props) => {

    return (
        <AuthenticatedLayout header={
            <PageTitle title={series.name}/>
        }>
            <Head title={series.name}/>
            <Banner id={series.id} type={'series'} title={series.name} description={series.overview} imageUrl={series.backdrop_path || series.poster_path}/>
            <PageDetail item={series} isBookmarked={isBookmarked} bookmarkedRecords={bookmarkedSeries} />
            {recommendations.length > 0 && (
                <div className={'mt-10'}>
                    <h2 className={'font-bold text-3xl'}>
                        Recommendations
                    </h2>
                    <ListCarousel bookmarkedRecords={bookmarkedSeries} list={recommendations} />
                </div>
            )}
        </AuthenticatedLayout>
    )
}

export default Show
