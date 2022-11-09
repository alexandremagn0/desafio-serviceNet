<?php

use App\Http\Controllers\Api\Users\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


/**
 * Users
 */
Route::prefix('/usuarios')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/{id}', [UserController::class, 'show'])->name('show');
    Route::post('/adicionar', [UserController::class, 'store'])->name('store');
    Route::put('/atualizar/{id}', [UserController::class, 'update'])->name('update');
    Route::delete('/remover/{id}', [UserController::class, 'delete'])->name('delete');
});
