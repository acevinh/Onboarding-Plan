<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount_Rules extends Model
{
    use HasFactory;
    protected $table = 'discount_rules'; 

    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

}
