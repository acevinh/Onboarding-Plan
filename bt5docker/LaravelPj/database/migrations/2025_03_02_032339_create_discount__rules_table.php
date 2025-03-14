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
        Schema::create('discount__rules', function (Blueprint $table) {
            $table->id('rule_id');
            $table->foreignId('discount_id')->constrained('discounts')->onDelete('cascade');
            $table->integer('buy_from');
            $table->integer('buy_to');
            $table->decimal('discount_value', 10, 2);
            $table->string('discount_type', 50);
            $table->string('discount_unit', 50);
            $table->string('tag', 255)->nullable();
            $table->string('tag1', 255)->nullable();
            $table->string('badge', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount__rules');
    }
};
