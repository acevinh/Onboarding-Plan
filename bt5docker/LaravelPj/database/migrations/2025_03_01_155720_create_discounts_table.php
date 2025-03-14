<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('store_id')->constrained('stores')->onDelete('cascade'); 
            $table->string('campaign_name', 255)->nullable(); 
            $table->string('campaign_code', 255)->nullable(); 
            $table->enum('campaign_type', ['buy_x_discount_y', 'discount by product']);
            $table->integer('product_assign')->default(0); 
            $table->boolean('all_product_rule')->default(0); 
            $table->boolean('status')->default(1);
            $table->timestamp('countdown')->nullable(); 
            $table->timestamps(); 
            $table->softDeletes(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
