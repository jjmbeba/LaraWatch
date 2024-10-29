import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import {Head} from "@inertiajs/react";
import AnimatedShinyText from "@/Components/ui/animated-shiny-text";
import {SearchResults} from "@/types/search.types";
import ListCarousel from "@/Components/ListCarousel";
import {BookmarkRecord} from "@/types/bookmarks.types";
import ErrorBoundary from "@/Boundaries/ErrorBoundary";
import {Button} from "@/Components/ui/button";
import {Filter} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet"

type Props = {
    search: string;
    results: SearchResults;
    bookmarkedMovies:BookmarkRecord[];
    bookmarkedSeries:BookmarkRecord[]
}

const Index = ({search, results, bookmarkedMovies, bookmarkedSeries}: Props) => {
    return (
        <AuthenticatedLayout header={
            <div className={'flex items-center justify-between'}>
                <h2 className="text-xl font-semibold leading-tight text-gray-800 flex items-center">
                    Search Results for: <AnimatedShinyText className={'capitalize mx-3'}>{search}</AnimatedShinyText>
                </h2>
                <Sheet>
                    <SheetTrigger>
                        <Button variant={'expandIcon'} Icon={Filter} iconPlacement={'right'}>
                            Filter
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                Filter search
                            </SheetTitle>
                            <SheetDescription>
                                Apply filters on search results
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        }>
            <Head title={'Search'}/>
            {!results.movie && !results.tv && (
                <h1 className={'font-bold text-2xl'}>
                    No records found for {search}
                </h1>
            )}
            <ErrorBoundary>
                {results.movie.length > 0 && <ListCarousel bookmarkedRecords={bookmarkedMovies} title={'Movies'}
                                                list={results.movie}/>}
            </ErrorBoundary>
            <ErrorBoundary>
                {results.tv.length > 0 && <ListCarousel bookmarkedRecords={bookmarkedSeries} title={'Tv Series'}
                                             list={results.tv}/>}
            </ErrorBoundary>
        </AuthenticatedLayout>
    )
}

export default Index;
