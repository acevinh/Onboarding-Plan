<?php

namespace App\Services;

use App\Jobs\SendWelcomeEmail;
use App\Mail\ResetPasswordMail;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;


class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // Các phương thức khác giữ nguyên
   public function register(array $data)
{
    $data['password'] = Hash::make($data['password']);
    $user = $this->userRepository->create($data);
    
    // SendWelcomeEmail::dispatch($user);
    
    return $user;
}
    public function login(array $credentials)
    {
        if (!$token = JWTAuth::attempt($credentials)) {
            return false;
        }

        $user = auth()->user();

        return [
            'user' => $user,
            'token' => $token,
        ];
    }


    public function sendResetLink($email)
    {
        $user = $this->userRepository->findByEmail($email);
        if ($user) {
            $token = Password::createToken($user);
            Mail::to($email)->send(new ResetPasswordMail($token, $email));
            return back()->with('status', 'Password reset link sent!');
        }
        return back()->withErrors(['email' => 'Email not found.']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
            'token' => 'required',
        ]);

        $user = $this->userRepository->findByEmail($request->email);

        if (!$user || !Password::tokenExists($user, $request->token)) {
            return false;
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return true;
    }

    public function logout()
    {
        auth()->logout();
    }
    public function getUser(array $data)
    {
        return $this->userRepository->findByEmail($data['email']);
    }
}
