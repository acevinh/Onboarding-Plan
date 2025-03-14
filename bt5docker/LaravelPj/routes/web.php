<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

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
Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', [AuthController::class, 'login'])->name('login.post');
    Route::get('register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('register', [AuthController::class, 'register'])->name('register.post');
    Route::get('forgotpassword', [AuthController::class, 'showForgotPass'])->name('forgotpassword');
    Route::post('sendReset', [AuthController::class, 'SendForgotPassword'])->name('password.reset');
    Route::get('password-reset/{token}', [AuthController::class, 'showResetPassword'])->name('password.reset.form');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('reset.password'); 
   
});


Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function(){
        return view('layouts.dashboard');
    });
});


Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    