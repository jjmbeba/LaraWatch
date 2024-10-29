<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Services\MovieService;
use Auth;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    protected $movieService;

    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }

    /**
     * Display a listing of the resource.
     * @throws ConnectionException
     */
    public function index()
    {
        $endpoints = [
            'trendingMovies' => '/trending/movie/day?language=en-US',
            'popularMovies' => '/movie/popular?language=en-US&page=1',
            'topRatedMovies' => '/movie/top_rated?language=en-US&page=1'
        ];

        $movies = $this->movieService->fetchMoviesConcurrentlyWithCache(array_values($endpoints));
        $movieList = array_combine(array_keys($endpoints), array_values($movies));

        $bookmarkedMovies = $this->movieService->getBookmarkedMovies();

        return Inertia::render('Movies/Index', [
            ...$movieList,
            'bookmarkedMovies' => $bookmarkedMovies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = $this->movieService->fetchMovieWithCache($id, 'movie');
        $collection = null;
        if ($movie['belongs_to_collection']) {
            $collection = $this->movieService->fetchCollectionWithCache($movie['belongs_to_collection']['id']) ?? [];
        }

        $recommendedMovies = $this->movieService->fetchRecommendedMoviesWithCache($id, 'movie')['results'];

        $isBookmarked = $this->movieService->isRecordBookmarked($id, 'movie');

        return Inertia::render('Movies/Show', [
            'movie' => $movie,
            'collection' => $collection,
            'recommendations' => $recommendedMovies,
            'isBookmarked' => $isBookmarked
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
