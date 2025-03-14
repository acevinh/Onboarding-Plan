<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscountDiscountRule extends Model
{
    use HasFactory;

    protected $table = 'discount_discount_rule';

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function discountRule()
    {
        return $this->belongsTo(Discount_Rules::class, 'rule_id', 'rule_id');
    }
}

