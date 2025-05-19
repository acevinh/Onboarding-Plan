<?php

namespace App\Observers;

use App\Models\User;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    // protected $logger;

    // public function __construct()
    // {
    //     // Tạo logger mới đẩy vào file cụ thể
    //     $this->logger = new Logger('user_activity');
    //     $this->logger->pushHandler(new StreamHandler(storage_path('logs/user_activity.log'), Logger::INFO));
    // }
    public function created(User $user): void
    {
        //
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user)
    {
       if ($user->wasChanged('username')) {
        Log::channel('user_activity')->info('User role updated', [
            'user_id' => $user->id,
            'username' => $user->username,
            'changed_fields' => $user->getChanges(),
            'original_fields' => $user->getOriginal(),
            'time' => now()->toDateTimeString()
        ]);
    }
    }
    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
