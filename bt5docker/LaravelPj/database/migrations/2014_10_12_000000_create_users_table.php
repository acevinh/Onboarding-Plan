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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('password');
            $table->unsignedBigInteger('role_id')->nullable(); // Thêm cột role_id
            $table->enum('status', ['Active', 'Locked'])->default('Active');
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->rememberToken();
            $table->timestamps(); 
            $table->softDeletes(); 

            // $table->string('password_reset_token')->nullable();
            // $table->timestamp('password_reset_expires_at')->nullable();

            // Thiết lập khóa ngoại cho role_id
            $table->foreign('role_id')->references('id')->on(config('permission.table_names.roles'))->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']); 
        });

        Schema::dropIfExists('users');
    }
};