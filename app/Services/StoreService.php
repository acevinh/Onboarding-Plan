<?php

namespace App\Services;

use App\Repositories\Contracts\StoreRepositoryInterface;

class StoreService
{
    protected $storeRepository;

    public function __construct(StoreRepositoryInterface $storeRepository)
    {
        $this->storeRepository = $storeRepository;
    }

    public function getAllStore()
    {
        return $this->storeRepository->getAllStore();
    }

    public function getStoreById($id)
    {
        return $this->storeRepository->getStoreById($id);
    }

    public function deleteStore($id)
    {
        if ($id && $this->storeRepository->getStoreById($id)) {
            return $this->storeRepository->deleteStore($id);
        } else {
            return false;
        }
    }
}
