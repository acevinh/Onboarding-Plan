<?php
namespace App\Services;

use App\Models\Role;
use App\Repositories\UserRepository;

class UserService
{
    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function getAllUser()
    {
        return $this->userRepository->getAllUser();
    }
    public function getUserById($id)
    {
        return $this->userRepository->findById($id);
    }
    public function getAllUsersFormatted()
    {
        return $this->userRepository->getAllWithRolesAndPermissions()->map(function ($user) {
            return [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'phone' => $user->phone,
                'status' => $user->status,
                'role_id' => $user->role_id,
                'roles' => $user->roles->pluck('name'),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'avatar' => 'https://i.pravatar.cc/150?img=' . $user->id,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ];
        });
    }
     public function getUserWithRoles(string $id)
    {
        $user = $this->userRepository->findById($id);
        $roles = Role::all();
        $hasRoles = $this->userRepository->getUserRoles($id)->pluck('id');

        return compact('user', 'roles', 'hasRoles');
    }

    public function updateUserWithRoles(string $id, array $userData, array $roles)
    {
        $user = $this->userRepository->update($id, $userData);
        $this->userRepository->syncRoles($id, $roles);
        return $user;
    }
}