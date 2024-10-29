<?php

use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\GenresController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SeriesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('bookmarks', BookmarkController::class)
    ->only(['index','store','destroy'])
    ->middleware(['auth']);

Route::resource('genres', GenresController::class)
    ->only(['index'])
    ->middleware(['auth']);

Route::resource('movies', MovieController::class)
    ->only(['index','show'])
    ->middleware(['auth']);

Route::resource('search', SearchController::class)
    ->only(['index'])
    ->middleware('auth');

Route::resource('series', SeriesController::class)
    ->only(['index','show'])
    ->middleware(['auth']);

require __DIR__.'/auth.php';