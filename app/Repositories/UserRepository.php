<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    protected $model;
    //   private static $instance = null;

    public function __construct(User $user)
    {
        $this->model = $user;
    }
        // Phương thức static để lấy instance
    // public static function getInstance(): self
    // {
    //     if (self::$instance === null) {
    //         self::$instance = new self(new User());
    //     }
    //     return self::$instance;
    // }
    public function getAllWithRolesAndPermissions()
    {
        return $this->model->with(['role', 'roles', 'permissions'])->get();
    }

    public function getAllUser()
    {
        return $this->model->all();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function update($id, array $data)
    {
        $user = $this->model->find($id);
        if ($user) {
            $user->update($data);
            return $user;
        }
        return null;
    }

    public function delete($id)
    {
        $user = $this->model->find($id);
        if ($user) {
            return $user->delete();
        }
        return false;
    }
    public function findById($id)
    {
        return $this->model->with(['roles'])->find($id);
    }

    public function updateUser(User $user, array $data): User
    {
        $user->update($data);
        return $user;
    }

     public function syncRoles(string $userId, array $roles)
    {
        $user = $this->findById($userId);
        return $user->syncRoles($roles);
    }

    public function getUserRoles(string $userId)
    {
        $user = $this->findById($userId);
        return $user->roles;
    }
}
