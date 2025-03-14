<?php

namespace App\Repositories;

use App\Models\Store;
use App\Repositories\Contracts\StoreRepositoryInterface;

class StoreRepository implements StoreRepositoryInterface
{
    protected $model;

    public function __construct(Store $store)
    {
        $this->model = $store;
    }

    public function getAllStore()
    {
        return $this->model->with('discounts.discountRules')->get(); // Eager load discounts and their rules
    }

    public function getStoreById($id)
    {
        return $this->model->with(['discounts.discountRules']) // Eager load discounts and their rules
            ->where('id', $id)
            ->first(); // Get the first matching record
    }

    public function deleteStore($id)
    {
        $store = $this->getStoreById($id);
        if ($store) {
            return $store->delete();
        }
        return false;
    }
}
