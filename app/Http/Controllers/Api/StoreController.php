<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StoreService;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    protected $storeService;

    public function __construct(StoreService $storeService)
    {
        $this->storeService = $storeService;

        // Middleware permission cho API nếu bạn đang dùng spatie/laravel-permission
        // $this->middleware('permission:view store', ['only' => ['index']]);
        // $this->middleware('permission:store details', ['only' => ['show']]);
        // $this->middleware('permission:store delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stores = $this->storeService->getAllStore();
        return response()->json([
            'success' => true,
            'data' => $stores
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $store = $this->storeService->getStoreById($id);

        if (!$store) {
            return response()->json([
                'success' => false,
                'message' => 'Store not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $store
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deleted = $this->storeService->deleteStore($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Store not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Store deleted successfully.'
        ]);
    }

    /**
     * Store a newly created resource in storage. (Not implemented)
     */
    public function store(Request $request)
    {
        return response()->json([
            'message' => 'Not implemented.'
        ], 501);
    }

    /**
     * Update the specified resource in storage. (Not implemented)
     */
    public function update(Request $request, string $id)
    {
        return response()->json([
            'message' => 'Not implemented.'
        ], 501);
    }
}
