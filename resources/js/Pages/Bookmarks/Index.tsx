import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from "@inertiajs/react";
import {Bookmark, BookmarkRecord} from "@/types/bookmarks.types";
import ListCarousel from "@/Components/ListCarousel";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "@/Components/ui/sheet"
import {Button} from "@/Components/ui/button";
import {Filter} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/Components/ui/tooltip"
import {Badge} from "@/Components/ui/badge";
import {types} from "@/constants";
import {clsx} from "clsx";


type Props = {
    records: Bookmark[];
    type: 'movie' | 'all' | 'tv';
    bookmarks: BookmarkRecord[]
}

const Index = ({records, type, bookmarks}: Props) => {
    return (
        <AuthenticatedLayout
            header={
                <div className={'flex items-center gap-5'}>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        My bookmarks {records.length > 0 && `(${records.length})`}
                    </h2>
                    {type !== 'all' && <Badge className={'capitalize'}>
                        {type}
                    </Badge>}
                </div>
            }
        >
            <Head title={'My Bookmarks'}/>
            <div className={'w-full flex items-end justify-end'}>
                <Sheet>
                    <SheetTrigger>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'expandIcon'} Icon={Filter} iconPlacement={'right'}>
                                        Filter
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Filter bookmarks
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>
                                <div>
                                    <h3>
                                        Filter by Bookmark Type
                                    </h3>
                                    <div className={'mt-4 flex items-center gap-2'}>
                                        {types.map(({name, query}) => (
                                            <a href={route('bookmarks.index', {
                                                type: query
                                            })} key={query}>
                                                <Badge variant={'outline'}
                                                       className={clsx('px-5 py-1 cursor-pointer border-indigo-300', {
                                                           'bg-indigo-400 text-white outline-none border-none': type === query
                                                       })}>
                                                    {name}
                                                </Badge>
                                            </a>
                                        ))}
                                    </div>
                                    <h3 className={'mt-5'}>
                                        Filter by Movie Genre
                                    </h3>
                                    <div className={'mt-4 flex items-center gap-2'}>
                                        {['All', 'Movie', 'Tv series'].map((type) => (
                                            <a href="#" key={type}>
                                                <Badge variant={'outline'}
                                                       className={'px-5 py-1 cursor-pointer border-black'}>
                                                    {type}
                                                </Badge>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <ListCarousel bookmarkedRecords={bookmarks} list={records}/>
        </AuthenticatedLayout>
    )
}

export default Index;
