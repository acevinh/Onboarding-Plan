<?php

namespace App\Http\Controllers;

use App\Services\StoreService;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function __construct(protected StoreService $storeService)
    {
        $this->storeService = $storeService;
        $this->middleware('permission:view store', ['only' => ['index']]);
        $this->middleware('permission:store details', ['only' => ['show']]);
        $this->middleware('permission:store delete', ['only' => ['destroy']]);
        
    }

    public function index()
    {
        $data = $this->storeService->getAllStore();
        return view('layouts.store.index', compact('data'));
    }

    public function show($id)
    {
        $data = $this->storeService->getStoreById($id);

        if (!$data) {
            return redirect()->back()->with('error', 'Store not found.');
        }

        return view('layouts.store.details', compact('data','id'));
    }

    public function destroy($id) 
    {
        if ($this->storeService->deleteStore($id)) {
            return redirect()->back()->with('success', 'Store deleted successfully');
        } else {
            return redirect()->back()->with('error', 'Store not found');
        }
    }
}
