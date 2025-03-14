<?php
namespace App\Services;

use App\Repositories\ProductRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Exception;

class ProductService
{
    protected $productRepo;

    public function __construct(ProductRepositoryInterface $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function getAllProducts()
    {
        return $this->productRepo->getAll();
    }

    public function getProductById($id)
    {
        return $this->productRepo->findById($id);
    }

    public function createProduct(array $data)
    {
        try {
            return $this->productRepo->create($data);
        } catch (Exception $e) {
            Log::error("Error creating product: " . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function updateProduct($id, array $data)
    {
        return $this->productRepo->update($id, $data);
    }

    public function deleteProduct($id)
    {
        return $this->productRepo->delete($id);
    }
}
