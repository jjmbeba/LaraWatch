import React, {FormEventHandler} from 'react';
import {Card} from "@/Components/ui/card";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/Components/ui/tooltip";
import {Button} from "@/Components/ui/button";
import {clsx} from "clsx";
import {BookmarkIcon, Loader} from "lucide-react";
import {generateImageUrl} from "@/functions";
import {CarouselItem} from "@/Components/ui/carousel";
import {Movie} from "@/types/movies.types";
import {Series} from "@/types/series.types";
import {Bookmark, BookmarkRecord} from "@/types/bookmarks.types";
import {useHover} from "@mantine/hooks";
import {useForm} from "@inertiajs/react";
import {toast} from "sonner";

type Props = {
    item: Movie | Series | Bookmark;
    isBookmarked:boolean;
    displayTitle:string;
    redirect:string;
    bookmarkedRecords:BookmarkRecord[]
}

const ListCarouselItem = ({item, isBookmarked, redirect, displayTitle, bookmarkedRecords}:Props) => {
    const {ref, hovered} = useHover();

    const {post, processing, delete:unBookmark} = useForm({
        'record_id': item.id.toString(),
        'record_type': 'title' in item ? 'movie' : 'tv'
    });

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
        <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/6" ref={ref}>
            <div className="p-1 relative">
                <Card>
                    {/* Show bookmark form only if hovered */}
                    {hovered && (
                        <form onSubmit={submit}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className={"absolute right-2 top-3"}>
                                        <Button
                                            disabled={processing}
                                            className={clsx({
                                                "hover:text-yellow-500": true,
                                                "text-yellow-500": isBookmarked,
                                            })}
                                            size={"icon"}
                                            variant={"outline"}
                                            type={"submit"}
                                        >
                                            {processing ? (
                                                <Loader className={"animate-spin"} />
                                            ) : (
                                                <BookmarkIcon
                                                    className={clsx({
                                                        "fill-yellow-500": isBookmarked,
                                                    })}
                                                />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            {isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </form>
                    )}
                    <img
                        className={"w-[180px] h-[265px] object-fit rounded-md"}
                        src={generateImageUrl(item.poster_path)}
                        alt={displayTitle}
                    />
                </Card>
                <Button variant={"link"} className={"text-sm mt-1 pl-0 text-left overflow-ellipsis"}>
                    <a
                        href={route(redirect, item.id)}
                        className={"w-[170px] overflow-hidden overflow-ellipsis"}
                    >
                        {displayTitle}
                    </a>
                </Button>
            </div>
        </CarouselItem>
    )
}

export default ListCarouselItem
