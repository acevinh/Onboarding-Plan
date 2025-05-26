<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DiscountRequest;
use App\Models\Discount_Product;
use App\Models\Discount_Rules;
use App\Services\DiscountService;
use App\Services\ProductService;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    protected $discountService;
    protected $productService;

    public function __construct(DiscountService $discountService, ProductService $productService)
    {
        $this->discountService = $discountService;
        $this->productService = $productService;
        
        
    }

    /**
     * Show form for creating new discount (API doesn't need this)
     */
    public function create($store_id)
    {
        $products = $this->productService->getAllProducts();
        return response()->json([
            'success' => true,
            'data' => [
                'store_id' => $store_id,
                'products' => $products
            ]
        ]);
    }

    /**
     * Store a newly created discount
     */
  public function store(DiscountRequest $request)
    {
        try {
            $discount = $this->discountService->create($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Discount created successfully',
                'data' => $discount
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Show form for editing discount (API doesn't need this)
     */
    public function edit($id)
    {
        $products = $this->productService->getAllProducts();
        $discount = $this->discountService->findById($id);

        if (!$discount) {
            return response()->json([
                'success' => false,
                'message' => 'Discount not found'
            ], 404);
        }

        $discountProducts = $discount->discountProducts;
        $discountRules = $discount->discountRules;

        return response()->json([
            'success' => true,
            'data' => [
                'discount' => $discount,
                'products' => $products,
                'discount_products' => $discountProducts,
                'discount_rules' => $discountRules
            ]
        ]);
    }

    /**
     * Update the specified discount
     */
    public function update(Request $request, $id)
{
    $data = $request->all();
    $updatedDiscount = $this->discountService->update($id, $data);

    if ($updatedDiscount) {
        return response()->json([
            'success' => true,
            'message' => 'Discount updated successfully',
            'data' => $updatedDiscount
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Failed to update discount'
    ], 400);
}
    /**
     * Remove the specified discount
     */
    public function destroy($id)
    {
        $deleted = $this->discountService->delete($id);
        
        if ($deleted) {
            return response()->json([
                'success' => true,
                'message' => 'Discount deleted successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Discount not found or could not be deleted'
        ], 404);
    }

    /**
     * Update discount status
     */
    public function updateStatus(Request $request, $id)
    {
        $status = $request->input('status');
        $updated = $this->discountService->updateStatus($id, $status);

        if ($updated) {
            return response()->json([
                'success' => true,
                'message' => 'Discount status updated successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to update discount status'
        ], 400);
    }

    /**
     * Update status for multiple discounts
     */
    public function updateStatusMultiple(Request $request)
    {
        $discountIds = $request->input('discountIds');
        $status = $request->input('status');
        $updated = $this->discountService->updateStatusMultiple($discountIds, $status);

        if ($updated) {
            return response()->json([
                'success' => true,
                'message' => 'Discounts status updated successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to update discounts status'
        ], 400);
    }

    /**
     * Delete multiple discounts
     */
    public function deleteMultiple(Request $request)
    {
        $discountIds = $request->input('discountIds');
        $deleted = $this->discountService->deleteMultiple($discountIds);

        if ($deleted) {
            return response()->json([
                'success' => true,
                'message' => 'Discounts deleted successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to delete discounts'
        ], 400);
    }

    /**
     * Remove product from discount
     */
    public function removeProduct(Request $request)
    {
        $productId = $request->input('product_id');
        $discountId = $request->input('discount_id');
        
        $deleted = Discount_Product::where('discount_id', $discountId)
                                  ->where('product_id', $productId)
                                  ->delete();
    
        return response()->json([
            'success' => true,
            'message' => $deleted ? 'Product removed' : 'Product was not assigned'
        ]);
    }

    public function clearProducts(Request $request)
    {
        $discountId = $request->input('discount_id');
        $cleared = $this->discountService->clearProductsFromDiscount($discountId);

        if ($cleared) {
            return response()->json([
                'success' => true,
                'message' => 'Products cleared from discount successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to clear products from discount'
        ], 400);
    }
}