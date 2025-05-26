<?php

namespace App\Services;

use App\Models\Discount_Product;
use App\Models\Discount_Rules;
use App\Repositories\DiscountRepository;
use Illuminate\Support\Arr;
use App\Factories\{
    AutomaticDiscountFactory,
    ManualDiscountFactory
};
use App\Jobs\UpdateMultipleDiscountStatus;
use App\Jobs\DeleteMultipleDiscounts; // Thêm dòng này nếu dùng queue cho deleteMultiple

class DiscountService
{
    protected $discountRepository;
    protected $automaticDiscountFactory;
    protected $manualDiscountFactory;

    public function __construct(
        DiscountRepository $discountRepository,
        AutomaticDiscountFactory $automaticDiscountFactory,
        ManualDiscountFactory $manualDiscountFactory
    ) {
        $this->discountRepository = $discountRepository;
        $this->automaticDiscountFactory = $automaticDiscountFactory;
        $this->manualDiscountFactory = $manualDiscountFactory;
    }

    public function updateStatus($id, $status)
    {
        return $this->discountRepository->updateStatus($id, $status);
    }

    public function updateStatusMultiple(array $discountIds, bool $status): bool
    {
        UpdateMultipleDiscountStatus::dispatch($discountIds, $status);
        return true;
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

    public function deleteMultiple(array $discountIds): bool
    {
        // Chọn 1 trong 2 cách:
        // 1. Cách cũ (đồng bộ)
        // return $this->discountRepository->deleteMultiple($discountIds);
        
        // 2. Cách mới dùng queue (bất đồng bộ)
        DeleteMultipleDiscounts::dispatch($discountIds);
        return true;
    }

    public function deleteAll()
    {
        return $this->discountRepository->deleteAll();
    }

    public function create(array $data)
    {
        // Phân loại factory dựa trên type (automatic/manual)
        $type = $data['type'] ?? 'automatic';
        $factory = $type === 'manual'
            ? $this->manualDiscountFactory
            : $this->automaticDiscountFactory;

        // Tạo discount cơ bản
        $discount = $factory->create($data);

        $rules = isset($data['rules']) ? $data['rules'] : null;
        unset($data['rules']);

        $selectedProducts = isset($data['selected_products']) && is_string($data['selected_products']) 
            ? explode(',', $data['selected_products']) 
            : [];
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
        $rules = $data['rules'] ?? [];

        // Lấy selected_products từ dữ liệu đầu vào
        $selectedProducts = $data['selected_products'] ?? [];

        // Loại bỏ các trường không thuộc bảng discounts
        $discountData = Arr::only($data, [
            'campaign_name',
            'campaign_code',
            'campaign_type',
            'store_id'
        ]);

        // Cập nhật discount
        $discount = $this->discountRepository->findById($id);
        if (!$discount) {
            return false;
        }

        $discount->update($discountData);

        // Xử lý rules
        $this->processRules($discount, $rules);

        // Xử lý products
        $this->processProducts($discount, $selectedProducts);

        return $discount->fresh();
    }

    protected function processRules($discount, $rules)
    {
        // Xóa tất cả rules cũ
        $discount->discountRules()->detach();

        foreach ($rules as $ruleData) {
            $rule = Discount_Rules::updateOrCreate(
                ['rule_id' => $ruleData['rule_id'] ?? null],
                Arr::except($ruleData, ['rule_id'])
            );
            $discount->discountRules()->attach($rule->rule_id);
        }
    }

    protected function processProducts($discount, $selectedProducts)
    {
        // Xóa tất cả products cũ
        $discount->discountProducts()->delete();

        foreach ($selectedProducts as $productId) {
            $discount->discountProducts()->create(['product_id' => $productId]);
        }
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