<?php

namespace App\Services;

use App\Mail\ResetPasswordMail;
// use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $data)
    {
        // $data['role_id'] = 3;
        $data['password'] = Hash::make($data['password']);
        return $this->userRepository->create($data);
    }

    public function login(array $data)
    {
        $user = $this->userRepository->findByEmail($data['email']);
        if ($user && Hash::check($data['password'], $user->password)) {
            auth()->login($user);
            return true;
        }
        return false;
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
}
