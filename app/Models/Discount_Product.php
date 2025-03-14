<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount_Product extends Model
{
    use HasFactory;

    protected $table = 'discount_products'; 

    protected $fillable = ['discount_id', 'product_id']; 

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
