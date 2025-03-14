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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id(); // log_id (Khóa chính)
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->string('action'); // Mô tả hành động
            $table->timestamp('timestamp')->useCurrent(); // Lưu thời điểm thực hiện
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
