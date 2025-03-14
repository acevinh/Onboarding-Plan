<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(protected UserService $userService)
    {
        $this->middleware('permission:view user', ['only' => ['index']]);
      $this->middleware('permission:update user', ['only' => ['edit','update']]);
    }
    public function index()
    {
        $data = $this->userService->getAllUser();
        return view('layouts.user.index',['data'=>$data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = $this->userService->getUserById($id);
        $roles = Role::all();
        $hasRoles = $user->roles->pluck('id');
        return view('layouts.user.update',['user'=>$user,'roles'=>$roles,'hasRoles'=>$hasRoles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $this->userService->getUserById($id);
        $user->username= $request->name;
        $user->email= $request->email;
        $user->save();
        $user->syncRoles($request->role);
        return redirect()->route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
