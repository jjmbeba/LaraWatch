import React, {FormEventHandler} from 'react';
import {generateImageUrl} from "@/functions";
import {Badge} from "@/Components/ui/badge";
import {MovieDetail} from "@/types/movies.types";
import {SeriesDetail} from "@/types/series.types";
import duration from 'dayjs/plugin/duration';
import dayjs from "dayjs";
import {Bookmark, Loader} from "lucide-react";
import {useForm} from "@inertiajs/react";
import {Button} from "@/Components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/Components/ui/tooltip"
import {clsx} from "clsx";
import {toast} from "sonner";
import {BookmarkRecord} from "@/types/bookmarks.types";


type Props = {
    item: MovieDetail | SeriesDetail,
    isBookmarked: boolean,
    bookmarkedRecords:BookmarkRecord[]
}

const PageDetail = ({item, isBookmarked, bookmarkedRecords}: Props) => {
    const {data, setData, post, processing, reset, errors, delete: unBookmark } = useForm({
        'record_id': item.id.toString(),
        'record_type': 'title' in item ? 'movie' : 'tv'
    });

    const displayTitle = 'title' in item ? item.title : (item as SeriesDetail).name;
    dayjs.extend(duration);

    const time = 'title' in item ? dayjs.duration({
        minutes: item.runtime % 60,
        hours: Math.floor(item.runtime / 60)
    }) : null;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if(isBookmarked){
            const foundBookmark = bookmarkedRecords.find(({record_type, record_id}) => {
                return record_id === item.id && record_type === ('title' in item ? 'movie' : 'tv');
            });

            unBookmark(route('bookmarks.destroy', foundBookmark!), {
                onSuccess:() => {
                    toast.success("Bookmark removed successfully");
                }
            });
        }else{
            post(route('bookmarks.store'), {
                onSuccess: () => {
                    toast.success("Bookmark added successfully");
                }
            });
        }
    }

    return (
        <>
            <div className={'relative'}>
                <img className={'absolute -top-48 left-20 w-[250px] h-[380px] object-fit rounded-md'}
                     src={generateImageUrl(item.poster_path)}
                     alt={displayTitle}/>
            </div>
            <div className={'grid place-items-end text-right mt-8'}>
                <div className={'text-left'}>
                    <div className={'flex justify-start items-center gap-5 max-w-3xl flex-wrap'}>
                        <h2 className={'font-bold text-3xl flex items-center gap-3'}>
                            <form onSubmit={submit}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button disabled={processing} className={clsx({
                                                'hover:text-yellow-500': true,
                                                'text-yellow-500': isBookmarked
                                            })} size={'icon'} variant={'outline'}
                                                    type={"submit"}>
                                                {processing ? <Loader className={'animate-spin'}/> :
                                                    <Bookmark className={clsx({
                                                        'fill-yellow-500': isBookmarked
                                                    })}/>}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </form>
                            {displayTitle}
                        </h2>
                        {time && (
                            <Badge>
                                {time.hours() === 1 ? '1 hour' : `${time.hours()} hours`} {time.minutes() === 1 ? '1 minute' : `${time.minutes()} minutes`}
                            </Badge>
                        )}
                        {item.vote_average > 0 && <Badge>
                            {item.vote_average.toPrecision(2)}
                        </Badge>}
                        {'name' in item && (
                            <>
                                <Badge>
                                    {item.number_of_seasons} {item.number_of_seasons === 1 ? 'season' : 'seasons'}
                                </Badge>
                                <Badge>
                                    {item.number_of_episodes} {item.number_of_episodes === 1 ? 'episode' : 'episodes'}
                                </Badge>
                            </>
                        )}
                        <div className={'flex items-center gap-2'}>
                            {item.genres.map((genre) => (
                                <Badge key={genre.id}>
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <p className={'mt-5 max-w-2xl text-md opacity-80 font-semibold'}>
                        {item.overview}
                    </p>
                </div>
            </div>
        </>
    )
}

export default PageDetail
