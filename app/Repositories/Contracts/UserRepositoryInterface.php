<?php

namespace App\Repositories\Contracts;

interface UserRepositoryInterface
{
    public function create(array $data);
    public function findByEmail($email);
    public function findById($id);
    public function update($id, array $data);
    public function delete($id);
    public function syncRoles(string $userId, array $roles);
    public function getUserRoles(string $userId);
}