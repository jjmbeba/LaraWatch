<?php

namespace App\Http\Controllers;

use App\Services\MovieService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GenresController extends Controller
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
        $movieGenreList = $this->movieService->fetchGenres('movie')['genres'];
        $seriesGenreList = $this->movieService->fetchGenres('tv')['genres'];

//        dd(rawurlencode("53 | 35"));
//
//        if($request->has('type') and $request->has('genre')){
//            if($request->type === 'movie'){
//
//            }
//        }

        return Inertia::render('Genres/Index',[
            'movieGenres' => $movieGenreList,
            'seriesGenres' => $seriesGenreList
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
