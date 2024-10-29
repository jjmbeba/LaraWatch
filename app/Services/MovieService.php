<?php

namespace App\Services;

use App\Models\Bookmark;
use Auth;
use Cache;
use Http;
use Illuminate\Http\Client\ConnectionException;

class MovieService
{
    protected $apiUrl = 'https://api.themoviedb.org/3';
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.tmdb.api_key');
    }

    /**
     * @throws ConnectionException
     */
    public function getBookmarkedMovies(){
        return Bookmark::where('user_id', Auth::id())
            ->where('record_type', 'movie')
            ->get();
    }

    public function getBookmarkedSeries(){
        return Bookmark::where('user_id', Auth::id())
            ->where('record_type', 'tv')
            ->get();
    }

    public function isRecordBookmarked(string $id, string $record_type){
        return Bookmark::where('user_id', Auth::id())
            ->where('record_id', $id)
            ->where('record_type', $record_type)
            ->exists();
    }

    public function fetchMovieWithCache(string $id, string $type)
    {
        $cacheKey =  $type . '_' . md5($id);

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($id, $type) {
            return Http::withToken($this->apiKey)->get("{$this->apiUrl}/{$type}/{$id}?language=en-US")->json();
        });
    }

    public function searchWithCache(string $query){
        $cacheKey = 'search_' . md5($query);

        return Cache::remember($cacheKey, now()->addMinutes(30), function() use ($query){
           return Http::withToken($this->apiKey)->get("{$this->apiUrl}/search/multi?query={$query}&include_adult=false&language=en-US&page=1")->json();
        });
    }

    public function fetchRecommendedMoviesWithCache(string $movieId, string $type)
    {
        $cacheKey = 'recommended_' . md5($movieId);

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($movieId, $type) {
            return Http::withToken($this->apiKey)->get("{$this->apiUrl}/{$type}/{$movieId}/recommendations?language=en-US&page=1")->json();
        });
    }

    public function fetchByCategories(string $id, string $type, string $genres){
        $cacheKey = "list_{$type}_categories_" . md5($id);

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($id, $type, $genres){
            return Http::withToken($this->apiKey)->get("{$this->apiUrl}/discover/{$type}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres={$genres}")->json();
        });
    }

    public function fetchCollectionWithCache(string $id)
    {
        return Http::withToken($this->apiKey)->get("{$this->apiUrl}/collection/{$id}?language=en-US")->json();
    }

    public function fetchMoviesConcurrentlyWithCache(array $endpoints)
    {
        // Create a unique cache key for each endpoint
        $cacheKeys = array_map(function ($endpoint) {
            // Check if the endpoint contains the word 'movie' or 'tv' and prefix accordingly
            if (str_contains($endpoint, 'movie')) {
                return 'movie_' . md5($endpoint);
            } elseif (str_contains($endpoint, 'tv')) {
                return 'tv_' . md5($endpoint);
            }
            // Default case if neither 'movie' nor 'tv' is found
            return 'unknown_' . md5($endpoint);
        }, $endpoints);

        // Try to retrieve the data from the cache
        $cachedMovies = Cache::many($cacheKeys);

        // Filter out endpoints where the data is not cached (empty values)
        $endpointsToFetch = [];
        foreach ($cacheKeys as $index => $cacheKey) {
            if (!$cachedMovies[$cacheKey]) {
                $endpointsToFetch[] = $endpoints[$index];
            }
        }

        // If all movies are cached, return them
        if (empty($endpointsToFetch)) {
            return $cachedMovies;
        }

        // Fetch the uncached movies concurrently
        $responses = Http::pool(function ($pool) use ($endpointsToFetch) {
            foreach ($endpointsToFetch as $endpoint) {
                $pool->withToken($this->apiKey)->get("{$this->apiUrl}{$endpoint}");
            }
        });

        // Cache the newly fetched results and merge with cached results
        foreach ($responses as $index => $response) {
            // Check if the endpoint contains the word 'movie' or 'tv' and prefix accordingly
            $endpoint = $endpointsToFetch[$index];
            if (str_contains($endpoint, 'movie')) {
                $cacheKey = 'movie_' . md5($endpoint);
            } elseif (str_contains($endpoint, 'tv')) {
                $cacheKey = 'tv_' . md5($endpoint);
            } else {
                $cacheKey = 'unknown_' . md5($endpoint);  // Fallback if neither movie nor tv is found
            }

//            $fetchedData = $response->json()['results'];
            $fetchedData = $response->json()['results'] ?? $response->json();

            // Store each fetched movie list in the cache
            Cache::put($cacheKey, $fetchedData, now()->addMinutes(30));

            // Update the cachedMovies array
            $cachedMovies[$cacheKey] = $fetchedData;
        }

        // Return the merged result of cached and freshly fetched movies
        return $cachedMovies;
    }

    public function fetchGenres(string $type){
        $cacheKey = 'genre_list_' . md5($type);

        return Cache::remember($cacheKey, now()->addMinutes(30), function() use($type){
           return Http::withToken($this->apiKey)->get("{$this->apiUrl}/genre/{$type}/list?language=en")->json();
        });
    }
}
