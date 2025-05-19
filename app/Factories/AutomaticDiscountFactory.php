<?php
// app/Factories/AutomaticDiscountFactory.php
namespace App\Factories;

use App\Models\Discount;
use Illuminate\Support\Str;

class AutomaticDiscountFactory implements DiscountFactory {
    public function create(array $data): Discount {
        $data['campaign_code'] = 'AUTO-' . Str::upper(Str::random(6));
        return Discount::create($data);
    }
}