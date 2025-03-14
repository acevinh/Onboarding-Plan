<?php
namespace App\Repositories\Contracts;
interface StoreRepositoryInterface
{
    public function getAllStore();
    public function getStoreById($id);
    public function deleteStore($id);
}