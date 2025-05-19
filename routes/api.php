<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DiscountController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// Public routes (không cần JWT token)
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('forgot-password', [AuthController::class, 'sendForgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

// Protected routes (yêu cầu JWT token)
Route::middleware(['auth:api'])->group(function () {
    // Auth routes
    Route::get('user', [AuthController::class, 'index']);
    Route::post('logout', [AuthController::class, 'logout']);
    
    // Dashboard routes
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('dashboard/chart-data', [DashboardController::class, 'getChartData']);

    // Store routes (giữ nguyên prefix của bạn)
    Route::prefix('stores')->group(function () {
        Route::get('/', [StoreController::class, 'index']);
        Route::get('{id}', [StoreController::class, 'show']);
        Route::delete('{id}', [StoreController::class, 'destroy']);
    });

    // Discount routes (giữ nguyên prefix của bạn)
    Route::prefix('discounts')->group(function () {
        Route::get('create/{store_id}', [DiscountController::class, 'create']);
        Route::post('/', [DiscountController::class, 'store']);
        Route::get('edit/{id}', [DiscountController::class, 'edit']);
        Route::put('{id}', [DiscountController::class, 'update']);
        Route::delete('{id}', [DiscountController::class, 'destroy']);
        Route::delete('delete-multiple', [DiscountController::class, 'deleteMultiple']);
        Route::post('{id}/status', [DiscountController::class, 'updateStatus']);
        Route::post('update-status-multiple', [DiscountController::class, 'updateStatusMultiple']);
        Route::post('remove-product', [DiscountController::class, 'removeProduct']);
        Route::post('clear-products', [DiscountController::class, 'clearProducts']);
    });

    // User routes (giữ nguyên prefix của bạn)
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('edit/{id}', [UserController::class, 'edit']);
        Route::post('{id}', [UserController::class, 'update']);
        Route::delete('{id}', [UserController::class, 'destroy']);
    });

    // Permission routes (giữ nguyên prefix của bạn)
    Route::prefix('permissions')->group(function () {
        Route::get('/', [PermissionController::class, 'index']);
        Route::post('/', [PermissionController::class, 'store']);
        Route::get('edit/{id}', [PermissionController::class, 'edit']);
        Route::post('{id}', [PermissionController::class, 'update']);
        Route::delete('{id}', [PermissionController::class, 'destroy']);
    });

    // Role routes (giữ nguyên prefix của bạn)
    Route::prefix('roles')->group(function () {
        Route::get('/', [RoleController::class, 'index']);
        Route::post('/', [RoleController::class, 'store']);
        Route::get('edit/{id}', [RoleController::class, 'edit']);
        Route::post('{id}', [RoleController::class, 'update']);
        Route::delete('{id}', [RoleController::class, 'destroy']);
    });
});