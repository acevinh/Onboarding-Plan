<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $role = Role::create(['name' => $request->name]);

        if (!empty($request->permission)) {
            foreach ($request->permission as $permission) {
                $role->givePermissionTo($permission);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => $role
        ]);
    }

    public function edit(string $id)
    {
        $role = Role::findOrFail($id);
        $hasPermissions = $role->permissions->pluck('name');
        $permissions = Permission::all();

        return response()->json([
            'success' => true,
            'data' => [
                'role' => $role,
                'hasPermissions' => $hasPermissions,
                'permissions' => $permissions
            ]
        ]);
    }

    public function update(Request $request, string $id)
    {
        $role = Role::findOrFail($id);
        $role->update(['name' => $request->name]);

        if (!empty($request->permission)) {
            $role->syncPermissions($request->permission);
        } else {
            $role->syncPermissions([]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $role
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully'
        ]);
    }
}
