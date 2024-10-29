<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Services\MovieService;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeriesController extends Controller
{
    protected $movieService;

    /**
     * Display a listing of the resource.
     */
    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }

    public function index()
    {
        $endpoints = [
            'trendingSeries' => '/trending/tv/day?language=en-US',
            'popularSeries' => '/tv/popular?language=en-US&page=1',
            'topRatedSeries' => '/tv/top_rated?language=en-US&page=1'
        ];

        $series = $this->movieService->fetchMoviesConcurrentlyWithCache(array_values($endpoints));
        $seriesList = array_combine(array_keys($endpoints), array_values($series));

        $bookmarkedSeries = Bookmark::where('user_id', Auth::id())
            ->where('record_type', 'tv')
            ->get();

        return Inertia::render('Series/Index', [
            ...$seriesList,
            'bookmarkedSeries' => $bookmarkedSeries
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
        $series = $this->movieService->fetchMovieWithCache($id, 'tv');

        $recommendedSeries = $this->movieService->fetchRecommendedMoviesWithCache($id, 'tv')['results'];

        $isBookmarked = $this->movieService->isRecordBookmarked($id, 'tv');
        $bookmarkedSeries = $this->movieService->getBookmarkedSeries();

        return Inertia::render('Series/Show', [
            'series' => $series,
            'recommendations' => $recommendedSeries,
            'isBookmarked' => $isBookmarked,
            'bookmarkedSeries' => $bookmarkedSeries
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
