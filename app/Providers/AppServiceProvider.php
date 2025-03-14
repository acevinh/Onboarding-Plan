<?php

namespace App\Providers;

use App\Repositories\Contracts\StoreRepositoryInterface;
use App\Repositories\StoreRepository; // Đảm bảo bạn đã import lớp StoreRepository
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\ProductRepository;
use App\Repositories\ProductRepositoryInterface;
use App\Repositories\UserRepository;
use App\Services\DashBoardService;
use App\Services\ProductService;
use App\Services\StoreService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Liên kết UserRepositoryInterface với UserRepository
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );

        // Liên kết StoreRepositoryInterface với StoreRepository
        $this->app->bind(
            StoreRepositoryInterface::class,
            StoreRepository::class
        );

        // Nếu bạn cần tiêm DashBoardService và StoreService, bạn có thể làm như sau:
        $this->app->bind(
            DashBoardService::class,
           
        );
       

        $this->app->bind(
            StoreService::class,
        );
        $this->app->bind(ProductRepositoryInterface::class, ProductRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('owner') ? true : null;
        });
    }
}
