<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $table = 'cart_item';
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'unit_price',
    ];
    
}
