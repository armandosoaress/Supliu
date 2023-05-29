<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiscografiaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', [DiscografiaController::class, 'index']);
Route::get('/Discografia', [DiscografiaController::class, 'list']);

Route::post('/createalbum', [DiscografiaController::class, 'createalbum']);
Route::get('/albums', [DiscografiaController::class, 'listalbums']);
Route::post('/createfaixa', [DiscografiaController::class, 'createfaixa']);


Route::post('/albums', [DiscografiaController::class, 'store']);
Route::get('/albums/{album}', [DiscografiaController::class, 'show']);
Route::get('/albums/{album}/edit', [DiscografiaController::class, 'edit']);
Route::put('/albums/{album}', [DiscografiaController::class, 'update']);
Route::delete('/albums/{album}', [DiscografiaController::class, 'destroy']);

// Route::get('/faixas', [FaixaController::class, 'index']);
// Route::get('/faixas/create', [FaixaController::class, 'create']);
// Route::post('/faixas', [FaixaController::class, 'store']);
// Route::get('/faixas/{faixa}', [FaixaController::class, 'show']);
// Route::get('/faixas/{faixa}/edit', [FaixaController::class, 'edit']);
// Route::put('/faixas/{faixa}', [FaixaController::class, 'update']);
// Route::delete('/faixas/{faixa}', [FaixaController::class, 'destroy']);


