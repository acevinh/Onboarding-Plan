<?php

namespace App\Repositories;

use App\Models\Discount;
use App\Models\Discount_Product;
use App\Repositories\Contracts\DiscountRepositoryInterface;

class DiscountRepository implements DiscountRepositoryInterface
{
    protected $discount;
    protected $discountProduct;
    public function __construct(Discount $discount,Discount_Product $discountProduct)
    {
        $this->discount = $discount;$this->discountProduct = $discountProduct;
    }
    public function updateStatus($id, $status)
    {
        $discount = $this->discount->find($id);
        if ($discount) {
            $discount->status = $status;
            return $discount->save();
        }
        return false;
    }
    public function updateStatusMultiple($discountIds, $status)
    {
        return Discount::whereIn('id', $discountIds)->update(['status' => $status]);
    }
    public function findById($id)
    {
        return $this->discount->find($id);
    }
    public function deleteMultiple(array $discountIds)
    {
        return $this->discount->whereIn('id', $discountIds)->delete(); // Soft delete
    }

    public function deleteAll()
    {
        return $this->discount->query()->delete(); // Soft delete all
    }
    public function create(array $data)
    {
        return $this->discount->create($data);
    }
    public function update($id, array $data)
{
    $discount = $this->findById($id);
    return $discount->update($data);
}
public function removeProductFromDiscount($discountId, $productId)
    {
        $this->discountProduct->where('discount_id', $discountId)
            ->where('product_id', $productId)
            ->delete();
    }

    public function clearProductsFromDiscount($discountId)
    {
        $this->discountProduct->where('discount_id', $discountId)->delete();
    }
}
