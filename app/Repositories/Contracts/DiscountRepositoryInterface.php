<?php
namespace App\Repositories\Contracts;
interface DiscountRepositoryInterface
{
    public function updateStatus($id, $status);
    public function create(array $data);
}