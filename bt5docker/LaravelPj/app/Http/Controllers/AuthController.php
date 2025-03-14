<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // protected $authService;

    public function __construct( protected AuthService $authService)
    {
        
    }

    public function login(LoginRequest $request)
    {
        if ($this->authService->login($request->validated())) {
            return redirect()->intended('/');
        }
        return back()->withErrors(['email' => 'Invalid credentials']);
    }

    public function register(RegisterRequest $request)
    {
        $this->authService->register($request->validated());
        return redirect()->route('login')->with('status', 'Registration successful! Please login.');
    }

    public function SendForgotPassword(ForgotPasswordRequest $request)
    {
        $this->authService->sendResetLink($request->validated()['email']);
        return back()->with('status', 'Password reset link sent!');
    }

    public function resetPassword(Request $request)
    {
        // Gọi phương thức resetPassword trong AuthService
        $result = $this->authService->resetPassword($request);
    
        if ($result) {
            return redirect()->route('login')->with('status', 'Password has been reset successfully!');
        }
    
        return back()->withErrors(['token' => 'This password reset token is invalid.']);
    }
    public function showLoginForm()
    {
    
        return view('auth.login');
    }
    public function showRegisterForm()
    {
        return view('auth.register');
    }
    public function showForgotPass()
    {
        return view('auth.forgot_password');
    }
    public function showResetPassword(Request $request)
    {
        $token = $request->route('token');
        $email = $request->query('email');
    
        return view('auth.reset_password', compact('token', 'email'));
    }
    public function logout()
    {
        auth()->logout();
        return redirect()->route('login');
    }
}
