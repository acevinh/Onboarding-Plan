<?php
// app/Factories/DiscountFactory.php
namespace App\Factories;

use App\Models\Discount;

interface DiscountFactory {
    public function create(array $data): Discount;
}