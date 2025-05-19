<?php

namespace App\Http\Controllers;

// use App\Models\Permission as ModelsPermission;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(){
        $this->middleware('permission:view permission', ['only' => ['index']]);
        $this->middleware('permission:create permission', ['only' => ['create','store']]);
        // $this->middleware('permission:edit role', ['only' => ['edit','update']]);
        $this->middleware('permission:update permission', ['only' => ['edit','update']]);
        $this->middleware('permission:delete permission', ['only' => ['destroy']]);
    }

    public function index()
    {
        $permissions = Permission::paginate(5);
        return view('layouts.permission.index', compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('layouts.permission.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Permission::create(['name' => $request->name]);
        return redirect()->route('permission.index');
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
        $permissions = Permission::findOrFail($id);
        return view('layouts.permission.update', compact('permissions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $permissions = Permission::findOrFail($id);
        $permissions->update(['name' => $request->name]);
        return redirect()->route('permission.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
      
        $permissions = Permission::findOrFail($id);
        $permissions->delete();
        return redirect()->route('permission.index');
    }
}
