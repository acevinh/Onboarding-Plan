<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discount extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function discountRules() 
    {
        return $this->belongsToMany(
            Discount_Rules::class, 
            'discount_discount_rule', 
            'discount_id', 
            'rule_id'
        )->withTimestamps();
    }
    
    public function discountProducts()
    {
        return $this->hasMany(Discount_Product::class, 'discount_id', 'id');
    }



}