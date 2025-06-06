<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private AuthService $authService;
    private UserService $userService;

    public function __construct(AuthService $authService, UserService $userService)
    {
        $this->authService = $authService;
        $this->userService = $userService;
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Authenticate user and return JWT token
     */
   public function login(LoginRequest $request): JsonResponse
{
    $credentials = $request->validated();

    try {
        $loginResult = $this->authService->login($credentials);

        if (!$loginResult) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        return $this->createAuthResponse(
            $loginResult['user'],
            $loginResult['token']
        );

    } catch (JWTException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Could not create token'
        ], 500);
    }
}

    public function register(Request $request): JsonResponse
    {
        try {
            $user = $this->authService->register($request->all());
            return response()->json([
                'success'=> true,
                'message'=> 'Registration success'
            ]);
                
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function index(): JsonResponse
    {
        try {
            $user = Auth::user();
            
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch user data'
            ], 500);
        }
    }

    public function logout(): JsonResponse
    {
        try {
            Auth::logout();
            
            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out'
            ]);
            
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to logout, please try again'
            ], 500);
        }
    }

    public function refresh(): JsonResponse
    {
        try {
            $token = Auth::refresh();
            
            return $this->createAuthResponse(Auth::user(), $token);
            
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to refresh token'
            ], 401);
        }
    }

    private function createAuthResponse($user, $token, $statusCode = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60
            ]
        ], $statusCode);
    }
}