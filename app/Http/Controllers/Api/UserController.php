<?php

namespace App\Http\Controllers\Api;

use App\Facades\UserFacade;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
}
public function index()
    {
        $users = UserFacade::getAllUsersFormatted();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }


    public function edit(string $id)
    {
        $user = $this->userService->getUserById($id);
        $roles = Role::all();
        $hasRoles = $user->roles->pluck('id');

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'roles' => $roles,
                'hasRoles' => $hasRoles
            ]
        ]);
    }
    public function update(Request $request, string $id)
    {
        $user = $this->userService->getUserById($id);
    session()->put('old_roles', $user->roles->pluck('name')->toArray());
        $user->username = $request->username;
        $user->email = $request->email;
        $user->save();

        $user->syncRoles($request->roles);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ]);
    }

}