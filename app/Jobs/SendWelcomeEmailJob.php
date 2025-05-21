<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmailJob implements ShouldQueue
{
   use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $emails;
    /**
     * Create a new job instance.
     */
    public function __construct($user, $emails)
    {
         $this->user = $user;
        $this->emails = $emails;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
          foreach ($this->emails as $email) {
            Mail::raw("Chào mừng {$this->user->name} đã đăng ký!", function ($message) use ($email) {
                $message->to($email)
                        ->subject('Đăng ký thành công');
            });
        }
    }
}
