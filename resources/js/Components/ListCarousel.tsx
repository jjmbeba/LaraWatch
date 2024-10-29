import React, {useState} from "react";
import {Carousel, CarouselContent, CarouselNext, CarouselPrevious} from "@/Components/ui/carousel";
import {Movie} from "@/types/movies.types";
import {Series} from "@/types/series.types";
import {Bookmark, BookmarkRecord} from "@/types/bookmarks.types";
import ListCarouselItem from "@/Components/ListCarouselItem";

type Props = {
    title?: string;
    list: Movie[] | Series[] | Bookmark[];
    bookmarkedRecords: BookmarkRecord[];
};

const ListCarousel = ({ title, list, bookmarkedRecords }: Props) => {
    const [hovered, setHovered] = useState<Number | null>(null);

    const isRecordBookmarked = (id: number, type: "movie" | "tv") => {
        return bookmarkedRecords.some(({ record_id, record_type }) => record_id === id && record_type === type);
    };

    if (!Array.isArray(list) || list.length === 0) {
        return <h1 className={"font-bold text-2xl"}>
            No records to display
        </h1>; // Fallback UI if list is empty or invalid
    }

    const filteredList = list.filter(({poster_path, backdrop_path}) => poster_path || backdrop_path);

    return (
        <div className={"mt-8"}>
            {title && <h1 className={"font-bold text-2xl"}>{title}</h1>}
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full mt-9"
            >
                <CarouselContent>
                    {filteredList.map((item) => {
                        const displayTitle = "title" in item ? item.title : (item as Series).name;
                        const redirect = "title" in item ? "movies.show" : "series.show";

                        const type = "title" in item ? "movie" : "tv";
                        const isBookmarked = isRecordBookmarked(item.id, type)

                        return (
                            <ListCarouselItem bookmarkedRecords={bookmarkedRecords} item={item} isBookmarked={isBookmarked} displayTitle={displayTitle} redirect={redirect}/>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default ListCarousel;
