<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UserController;
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
    // Route::group(['middleware'=>['role:yeyrseyur']])
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::prefix('store')->group(function (){
        Route::get('list', [StoreController::class, 'index'])->name('store.list');
        Route::delete('delete-store/{id}', [StoreController::class, 'destroy'])->name('store.delete'); 
        Route::get('details/{id}', [StoreController::class, 'show'])->name('store.details'); 
    });
    route::prefix('discounts')->group(function(){
        // Route::get('list', [DiscountController::class, 'index'])->name('discounts.list');
        Route::get('/create/{store_id}', [DiscountController::class, 'create'])->name('discounts.create');
        Route::post('/store', [DiscountController::class, 'store'])->name('discounts.store');
        // Route::post('store', [DiscountController::class, 'store'])->name('discounts.store');
        Route::get('edit/{id}', [DiscountController::class, 'edit'])->name('discounts.edit');
        Route::put('update/{id}', [DiscountController::class, 'update'])->name('discounts.update');
        Route::delete('/delete/{id}', [DiscountController::class, 'destroy'])->name('discounts.delete'); 
        Route::delete('/delete-multiple', [DiscountController::class, 'deleteMultiple'])->name('discounts.deleteMultiple'); 
        Route::delete('/delete-all', [DiscountController::class, 'deleteMultiple'])->name('discounts.deleteAll'); 
        Route::post('/{id}/status', [DiscountController::class, 'updateStatus'])->name('discounts.updateStatus');
        Route::post('/update-status-multiple', [DiscountController::class, 'updateStatusMultiple'])->name('discounts.updateStatusMultiple');
    });
    Route::prefix('user')->group(function(){
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::get('edit/{id}', [UserController::class, 'edit'])->name('user.edit');
        Route::post('update/{id}', [UserController::class, 'update'])->name('user.update');
        Route::delete('delete/{id}', [UserController::class, 'destroy'])->name('user.delete');
    });
  
    Route::prefix('permission')->group(function () {
        Route::get('/', [PermissionController::class, 'index'])->name('permission.index');
        Route::get('create', [PermissionController::class, 'create'])->name('permission.create'); 
        Route::post('store', [PermissionController::class, 'store'])->name('permission.store'); 
        Route::get('edit/{id}', [PermissionController::class, 'edit'])->name('permission.edit'); 
        Route::post('update/{id}', [PermissionController::class, 'update'])->name('permission.update'); 
        Route::delete('delete/{id}', [PermissionController::class, 'destroy'])->name('permission.delete'); 
    });
    Route::prefix('role')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('role.index');
        Route::get('create', [RoleController::class, 'create'])->name('role.create');
        Route::post('store', [RoleController::class, 'store'])->name('role.store');
        Route::get('edit/{id}', [RoleController::class, 'edit'])->name('role.edit');
        Route::post('update/{id}', [RoleController::class, 'update'])->name('role.update');
        Route::delete('delete/{id}', [RoleController::class, 'destroy'])->name('role.delete');
    });
});
Route::get('dashboard/chart-data', [DashboardController::class, 'getChartData'])->name('dashboard.chart.data');
Route::post('/discount/remove-product', [DiscountController::class, 'removeProduct'])->name('discount.removeProduct');
Route::post('/discount/clear-products', [DiscountController::class, 'clearProducts'])->name('discount.clearProducts');

Route::post('logout', [AuthController::class, 'logout'])->name('logout');