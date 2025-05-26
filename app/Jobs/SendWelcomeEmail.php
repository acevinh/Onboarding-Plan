<?php

namespace App\Jobs;

use App\Mail\WelcomeEmail;
use App\Mail\WelcomeNewUser;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected User $user) {}

    public function handle()
    {
        Mail::to($this->user->email)->send(new WelcomeNewUser($this->user));
    }
}