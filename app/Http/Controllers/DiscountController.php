<?php

namespace App\Http\Controllers;

use App\Http\Requests\DiscountRequest;
use App\Models\Discount;
use App\Services\DiscountService;
use App\Services\ProductService;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(protected DiscountService $discountService, protected ProductService $product_service)
    {
        $this->middleware('permission:add new discount', ['only' => ['create','store']]);
        $this->middleware('permission:update discount', ['only' => ['edit','update']]);
        $this->middleware('permission:active discount', ['only' => ['updateStatus','updateStatusMultiple']]);
        $this->middleware('permission:delete discount', ['only' => ['destroy','deleteMultiple']]);
    }
    
  
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        $product = $this->product_service->getAllProducts();
        return view('layouts.discount.create', ['id' => $id, 'product' => $product]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DiscountRequest $request)
    {
        $data = $request->all();
        $discount = $this->discountService->create($data);
    
        if ($discount) {
            return redirect()->route('store.details', $request->store_id)->with('success', 'Discount created successfully.');
        }
    
        return redirect()->back()->with('error', 'Failed to create discount.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Discount $discount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // dd($id);
        $product = $this->product_service->getAllProducts();
        $data = $this->discountService->findById($id);
        return view('layouts.discount.edit', ['data' => $data, 'product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request , $id)
    {
        $data = $request->all();

        // Gọi service để cập nhật discount
        $updatedDiscount = $this->discountService->update($id, $data);
    
        if ($updatedDiscount) {
            return redirect()->route('discounts.edit', $id)->with('success', 'Discount updated successfully.');
        }
    
        return redirect()->back()->with('error', 'Failed to update discount.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $deleted = $this->discountService->delete($id);
        if ($deleted) {
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false], 404); 
    }
    public function updateStatus(Request $request, $id)
    {
        $status = $request->input('status');
        $updated = $this->discountService->updateStatus($id, $status);

        return response()->json(['success' => $updated]);
    }
    public function updateStatusMultiple(Request $request)
{
    $discountIds = $request->input('discountIds');
    $status = $request->input('status');
    $updated = $this->discountService->updateStatusMultiple($discountIds, $status);

    return response()->json(['success' => $updated]);
}

public function deleteMultiple(Request $request)
{
    $discountIds = $request->input('discountIds');
    $deleted = $this->discountService->deleteMultiple($discountIds);

    return response()->json(['success' => $deleted]);
}
public function removeProduct(Request $request)
    {
        $productId = $request->input('product_id');
        $discountId = $request->input('discount_id');

        $this->discountService->removeProductFromDiscount($discountId, $productId);

        return response()->json(['success' => true]);
    }

    public function clearProducts(Request $request)
    {
        $discountId = $request->input('discount_id');

        $this->discountService->clearProductsFromDiscount($discountId);

        return response()->json(['success' => true]);
    }
}
