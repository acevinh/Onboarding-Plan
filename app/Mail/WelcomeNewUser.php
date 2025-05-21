<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeNewUser extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    // Truyền user khi gửi email
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    // Cấu hình tiêu đề, view
    public function build()
    {
        return $this->subject('Chào mừng bạn đến với hệ thống!')
                    ->view('emails.welcome');
    }
}
