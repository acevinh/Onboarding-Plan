<?php

namespace App\Jobs;

use App\Models\Discount;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateMultipleDiscountStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $discountIds;
    protected $status;

    public function __construct(array $discountIds, bool $status)
    {
        $this->discountIds = $discountIds;
        $this->status = $status;
    }

    public function handle()
    {
        Discount::whereIn('id', $this->discountIds)
                ->update(['status' => $this->status]);
    }
}