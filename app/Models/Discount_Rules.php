<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount_Rules extends Model
{
    use HasFactory;

    protected $table = 'discount__rules'; 
    protected $primaryKey = 'rule_id';
    protected $fillable = [
        'buy_from', 
        'buy_to',
        'discount_value',
        'discount_type',
        'discount_unit',
        'tag',
        'tag1',
        'badge',
    ];
    public function discounts()
    {
        return $this->belongsToMany(Discount::class, 'discount_discount_rule', 'rule_id', 'discount_id');
    }
}
