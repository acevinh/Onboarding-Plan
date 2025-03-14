<?php
namespace App\Services;

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
        return $this->userRepository->getUserById($id);
    }
}