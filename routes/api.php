<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::post('signup', [AuthController::class, 'signup'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');


Route::middleware(['api', 'auth:api'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    Route::apiResource('events', EventController::class)->except(['store', 'update', 'destroy']);
    Route::post('events', [EventController::class, 'store'])->middleware('permission:create_event')->name('events.store');
    Route::put('events/{event}', [EventController::class, 'update'])->middleware('permission:edit_event')->name('events.update');
    Route::delete('events/{event}', [EventController::class, 'destroy'])->middleware('permission:delete_event')->name('events.destroy');

    Route::get('/events/{id}/attendees', [EventController::class, 'attendees']);
    Route::post('/events/{id}/join', [EventController::class, 'join'])->middleware('event-registration-checking');
    Route::patch('/events/{id}/status', [EventController::class, 'changeStatus']);
    Route::get('/getStats', [AuthController::class, 'getAdminStat']);
});
