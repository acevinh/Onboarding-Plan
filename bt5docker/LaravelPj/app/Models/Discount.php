<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function discountProducts()
    {
        return $this->hasMany(Discount_Product::class);
    }

    public function discountRules()
    {
        return $this->hasMany(Discount_Rules::class);
    }
}
