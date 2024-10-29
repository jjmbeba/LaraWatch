import {Movie} from "@/types/movies.types";
import {Series} from "@/types/series.types";
import {Person} from "@/types/people.types";

export type SearchResults = {
    movie: Movie[],
    tv: Series[],
    person:Person[]
};
