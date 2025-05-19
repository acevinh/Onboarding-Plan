<?php
// app/Facades/UserFacade.php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \Illuminate\Support\Collection getAllUsersFormatted()
 * @method static \App\Models\User getUserById(string $id)
 * @method static \App\Models\User updateUser(string $id, array $data)
 */
class UserFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \App\Services\UserService::class;
    }
}
