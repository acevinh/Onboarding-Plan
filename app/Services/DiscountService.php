<?php

namespace App\Services;

use App\Models\Discount_Product;
use App\Repositories\DiscountRepository;

class DiscountService
{
    protected $discountRepository;
    

    public function __construct(DiscountRepository $discountRepository)
    {
        $this->discountRepository = $discountRepository;
        
    }

    public function updateStatus($id, $status)
    {
        return $this->discountRepository->updateStatus($id, $status);
    }
    public function updateStatusMultiple($discountIds, $status)
    {
        return $this->discountRepository->updateStatusMultiple($discountIds, $status);
    }
    public function findById($id)
    {
        return $this->discountRepository->findById($id);
    }
    public function delete($id)
    {
        $discount = $this->discountRepository->findById($id);
        if ($discount) {
            return $discount->delete();
        }
        return false;
    }

    public function deleteMultiple(array $discountIds)
    {
        return $this->discountRepository->deleteMultiple($discountIds);
    }

    public function deleteAll()
    {
        return $this->discountRepository->deleteAll();
    }
    public function create(array $data)
    {

        $rules = isset($data['rules']) ? $data['rules'] : null;
        unset($data['rules']);


        $selectedProducts = isset($data['selected_products']) ? explode(',', $data['selected_products']) : [];
        unset($data['selected_products']);


        $discount = $this->discountRepository->create($data);


        if ($rules) {
            $discount->discountRules()->createMany($rules);
        }


        if (!empty($selectedProducts)) {
            foreach ($selectedProducts as $productId) {
                $discount->discountProducts()->create(['product_id' => $productId]);
            }
        }

        return $discount;
    }

    public function update($id, array $data)
    {
        // Lấy rules từ dữ liệu đầu vào
        $rules = isset($data['rules']) ? $data['rules'] : null;
        unset($data['rules']);

        // Lấy selected_products từ dữ liệu đầu vào và chuyển đổi thành mảng
        $selectedProducts = isset($data['selected_products']) ? explode(',', $data['selected_products']) : [];
        unset($data['selected_products']);

        // Cập nhật discount
        $discount = $this->discountRepository->findById($id);
        if (!$discount) {
            return false; // Nếu không tìm thấy discount
        }

        $discount->update($data); // Cập nhật discount với dữ liệu mới

        // Cập nhật rules nếu có
        if ($rules) {
            $discount->discountRules()->delete(); // Xóa các rules cũ
            $discount->discountRules()->createMany($rules); // Thêm các rules mới
        }

        // Cập nhật các sản phẩm được chọn vào bảng discount_products
        $discount->discountProducts()->delete(); // Xóa các sản phẩm cũ
        if (!empty($selectedProducts)) {
            foreach ($selectedProducts as $productId) {
                $discount->discountProducts()->create(['product_id' => $productId]);
            }
        }

        return $discount;
    }
    public function removeProductFromDiscount($discountId, $productId)
    {
        $this->discountRepository->removeProductFromDiscount($discountId, $productId);
    }

    public function clearProductsFromDiscount($discountId)
    {
        $this->discountRepository->clearProductsFromDiscount($discountId);
    }
}
