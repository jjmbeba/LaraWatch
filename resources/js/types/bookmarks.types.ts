import {SeriesDetail} from "@/types/series.types";
import {MovieDetail} from "@/types/movies.types";

interface MediaBase {
    id: number;
    poster_path: string;
    backdrop_path:string;
    overview: string;
    vote_average: number;
    vote_count: number;
}

export type MovieDetailWithMedia = MediaBase & MovieDetail & { media_type: 'movie' };
export type SeriesDetailWithMedia = MediaBase & SeriesDetail & { media_type: 'series' };

export type Bookmark = MovieDetailWithMedia | SeriesDetailWithMedia;

export type BookmarkRecord = {
    id:number;
    record_type:string;
    record_id:number;
}
