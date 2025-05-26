<?php

namespace App\Jobs;

use App\Models\Discount;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteMultipleDiscounts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $discountIds;

    public function __construct(array $discountIds)
    {
        $this->discountIds = $discountIds;
    }

    public function handle()
    {
        Discount::whereIn('id', $this->discountIds)->delete();
    }
}