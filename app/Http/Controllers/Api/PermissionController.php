<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    
    public function index()
    {
        $permissions = Permission::all();
        return response()->json([
            'success' => true,
            'permissions' => $permissions]);
    }

    public function store(Request $request)
    {
        $permission = Permission::create(['name' => $request->name]);
        return response()->json([
            'success' => true,
            'message' => 'Permission created successfully',
            'permission' => $permission
        ]);
    }

    public function edit(string $id)
    {
        $permission = Permission::findOrFail($id);
        return response()->json([
            'success' => true,
            'permission' => $permission
        ]);
    }

    public function update(Request $request, string $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->update(['name' => $request->name]);
        return response()->json([
            'success' => true,
            'message' => 'Permission updated successfully',
            'permission' => $permission
        ]);
    }

    public function destroy(string $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();
        return response()->json([
            'success' => true,
            'message' => 'Permission deleted successfully'
        ]);
    }

}
