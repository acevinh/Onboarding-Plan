<?php
namespace App\Services;

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
    private static $instance = null;

    // Private constructor để ngăn việc tạo instance từ bên ngoài
    private function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // Phương thức static để lấy instance
    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self(UserRepository::getInstance());
        }
        return self::$instance;
    }

    // Các phương thức khác giữ nguyên
    public function register(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        return $this->userRepository->create($data);
    }

    public function login(array $data)
    {
        $user = $this->userRepository->findByEmail($data['email']);
        if ($user && Hash::check($data['password'], $user->password)) {
            auth()->login($user);
            return auth()->user();
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
    public function getUser(array $data)
    {
        return $this->userRepository->findByEmail($data['email']);
    }

}
