<?php

use App\Console\Commands\SendMailCommand;
use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function(){
    Log::info('Log message every 10 seconds: ' . now());
})->everyTenSeconds();
Schedule::command(SendMailCommand::class)->everyMinute();