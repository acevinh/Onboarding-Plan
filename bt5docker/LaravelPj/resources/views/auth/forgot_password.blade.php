@extends('auth.index')
@section('content')
<div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center">Forgot Password</h2>

        <form action="{{ route('password.reset') }}" method="POST">
            @csrf
            <div class="mb-4">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="email" name="email" class="input input-bordered w-full" placeholder="Enter your email">
                @error('email')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary w-full">Send Reset Link</button>
        </form>
        <div class="mt-4 text-center">
            <p>Remembered your password? <a href="{{ route('login') }}" class="text-blue-500 hover:underline">Login</a></ p>
        </div>
    </div>
</div>
@endsection