<?php

namespace App\Http\Controllers;

use App\Services\MovieService;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Laravel\Prompts\search;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $movieService;

    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }

    /**
     * @throws ConnectionException
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required'
        ]);

        $results = [
            'movie' => [],
            'tv' => []
        ];

        foreach ($this->movieService->searchWithCache($validated['query'])['results'] as $result) {
            if (isset($result['media_type']) && isset($results[$result['media_type']])) {
                $results[$result['media_type']][] = $result;
            }
        }

        return Inertia::render('Search/Index', [
            'search' => $validated['query'],
            'results' => $results,
            'bookmarkedMovies' => $this->movieService->getBookmarkedMovies() ?? [],
            'bookmarkedSeries' => $this->movieService->getBookmarkedSeries() ?? [],
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
        //
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
