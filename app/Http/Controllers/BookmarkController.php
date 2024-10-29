<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Services\MovieService;
use Auth;
use Gate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $movieService;

    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }

    public function index(Request $request)
    {
        $type = 'all';

        if ($request->has('type')) {
            $type = $request->type;
        }

        if ($type !== 'all') {
            $bookmarks = Bookmark::where('user_id', Auth::id())
                ->where('record_type', $type)
                ->latest()->get();
        } else {
            $bookmarks = Bookmark::where('user_id', Auth::id())
                ->latest()->get();
        }

        $endpoints = $bookmarks->map(function (Bookmark $bookmark) {
            return "/{$bookmark['record_type']}/{$bookmark['record_id']}?language=en-US";
        });

        $records = $this->movieService->fetchMoviesConcurrentlyWithCache($endpoints->toArray());

        $bookmarks = Bookmark::where('user_id', Auth::id())
            ->get();

        return Inertia::render('Bookmarks/Index', [
            'records' => array_values($records),
            'type' => $type,
            'bookmarks' => $bookmarks
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
        $validated = $request->validate([
            'record_id' => 'required|string',
            'record_type' => 'required|string'
        ]);

        $request->user()->bookmarks()->create($validated);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Bookmark $bookmark)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookmark $bookmark)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookmark $bookmark)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookmark $bookmark)
    {
        Gate::authorize('delete', $bookmark);
        $bookmark->delete();

        return back();
    }
}
