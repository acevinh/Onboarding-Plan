<?php
// app/Factories/ManualDiscountFactory.php
namespace App\Factories;

use App\Models\Discount;

class ManualDiscountFactory implements DiscountFactory {
    public function create(array $data): Discount {
        if (Discount::where('campaign_code', $data['campaign_code'])->exists()) {
            throw new \Exception('Discount code already exists');
        }
        return Discount::create($data);
    }
}