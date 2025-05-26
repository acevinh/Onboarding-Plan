<?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Repositories\ProductRepositoryInterface;
// use Illuminate\Http\Request;

// class ProductController extends Controller
// {
//     protected $productRepo;

//     public function __construct(ProductRepositoryInterface $productRepo)
//     {
//         $this->productRepo = $productRepo;
//     }

//     public function index()
//     {
//         return response()->json($this->productRepo->getAll());
//     }

//     public function show($id)
//     {
//         $product = $this->productRepo->findById($id);
//         return $product ? response()->json($product) : response()->json(['message' => 'Not Found'], 404);
//     }

//     public function store(Request $request)
//     {
//         $data = $request->validate([
//             'name' => 'required|string',
//             'price' => 'required|numeric'
//         ]);
//         return response()->json($this->productRepo->create($data), 201);
//     }

//     public function update(Request $request, $id)
//     {
//         $data = $request->validate([
//             'name' => 'sometimes|required|string',
//             'price' => 'sometimes|required|numeric'
//         ]);
//         $product = $this->productRepo->update($id, $data);
//         return $product ? response()->json($product) : response()->json(['message' => 'Not Found'], 404);
//     }

//     public function destroy($id)
//     {
//         return $this->productRepo->delete($id) ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Not Found'], 404);
//     }
// }

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService; 

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService; 
    }

    public function index()
    {
        return response()->json($this->productService->getAllProducts()); 
    }

    public function show($id)
    {
        $product = $this->productService->getProductById($id); 
        return $product ? response()->json($product) : response()->json(['message' => 'Not Found'], 404);
    }

    public function store(Request $request)
    {
        $data = [
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'product_image' => $request->input('product_image'),
            'product_link' => $request->input('product_link'),
            'description' => $request->input('description'),
            'store_id' => $request->input('store_id'),  
        ];
        return response()->json($this->productService->createProduct($data), 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric'
        ]);
        $product = $this->productService->updateProduct($id, $data);
        return $product ? response()->json($product) : response()->json(['message' => 'Not Found'], 404);
    }

    public function destroy($id)
    {
        return $this->productService->deleteProduct($id) ? response()->json(['message' => 'Deleted']) : response()->json(['message' => 'Not Found'], 404); // Gọi phương thức từ ProductService
    }
}
