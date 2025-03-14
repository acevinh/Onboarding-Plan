<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function __construct(){
    $this->middleware('permission:view role', ['only' => ['index']]);
    $this->middleware('permission:create role', ['only' => ['create','store']]);
    $this->middleware('permission:edit role', ['only' => ['edit','update']]);
    // $this->middleware('permission:update role', ['only' => ['edit','update']]);
    $this->middleware('permission:delete role', ['only' => ['destroy']]);
}
     
    public function index()
    {
        $roles = Role::all();
       return view('layouts.role.index',compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Permission::all();
        return view('layouts.role.create',compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Role::create(['name' => $request->name]);
        if(!empty($request->permission)){
            foreach ($request->permission as $permission) {
                $role = Role::findByName($request->name);
                $role->givePermissionTo($permission);
            }
        }
        return redirect()->route('role.index');
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
       $role = Role::findOrFail($id);
       $hasPermissions = $role->permissions->pluck('name');
       $permissions = Permission::all();
       return view('layouts.role.update', compact('role', 'hasPermissions', 'permissions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $role = Role::findOrFail($id);
         $role->update(['name' => $request->name]);
         if(!empty($request->permission)){
            $role->syncPermissions($request->permission);}
            else{
                $role->syncPermissions([]);
            }
            return redirect()->route('role.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role= Role::findOrFail($id);
        $role->delete();
        return redirect()->route('role.index');
    }
}
