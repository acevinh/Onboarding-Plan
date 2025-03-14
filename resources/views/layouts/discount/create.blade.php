@extends('index')
@section('css')
    
@endsection

@section('content')
@if (session('success'))
    <div class="alert alert-success">
        <div class="flex justify-between">
            <span>{{ session('success') }}</span>
        </div>
    </div>
@endif

@if (session('error'))
    <div class="alert alert-error">
        <div class="flex justify-between">
            <span>{{ session('error') }}</span>
        </div>
    </div>
@endif

<!-- Hiển thị thông báo lỗi -->
@if ($errors->any())
    <div class="alert alert-error">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Create New Discount</h1>
    <form id="discountForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="{{ route('discounts.store') }}" method="POST">
        @csrf
        <!-- Hidden input for store ID -->
        <input type="hidden" name="store_id" value="{{ $id }}">

        <!-- Basic Discount Information -->
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="campaign_name">Campaign Name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="campaign_name" name="campaign_name" type="text" placeholder="Enter campaign name" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="campaign_code">Campaign Code</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="campaign_code" name="campaign_code" type="text" placeholder="Enter campaign code">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="campaign_type">Campaign Type</label>
            <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="campaign_type" name="campaign_type" required>
                <option value="buy_x_discount_y">Buy X Discount Y</option>
                <option value="discount by product">Discount by Product</option>
            </select>
        </div>
        <div id="productSelection" class="mb-4 hidden">
            <h2 class="text-xl font-bold mb-2">Select Products</h2>
            <div class="mb-4">
                <select id="productSelect" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select a product</option>
                    @foreach ($product as $pro)
                        <option value="{{ $pro->id }}">{{ $pro->name }}</option>
                    @endforeach
                </select>
                <button type="button" id="addProduct" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    <ion-icon name="add-outline"></ion-icon> Add Product
                </button>
            </div>
            <div id="productContainer" class="mb-4">
                <!-- Danh sách sản phẩm đã chọn sẽ được thêm vào đây -->
            </div>
            <input type="hidden" name="selected_products" id="selectedProducts">
        </div>
        <!-- Discount Rules Section -->
        <div id="rulesSection" class="mb-4">
            <h2 class="text-xl font-bold mb-2">Discount Rules</h2>
            <div id="rulesContainer">
                <!-- Rule Template -->
                <div class="rule mb-4 p-4 border rounded">
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="buy_from ">Buy From</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="rules[0][buy_from]" placeholder="Enter buy from" required>
                        @error('rules.0.buy_from')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="buy_to">Buy To</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="rules[0][buy_to]" placeholder="Enter buy to">
                        @error('rules.0.buy_to')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="discount_value">Discount Value</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="rules[0][discount_value]" placeholder="Enter discount value" required>
                        @error('rules.0.discount_value')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="discount_type">Discount Type</label>
                        <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="rules[0][discount_type]" required>
                            <option value="per_item">Per Item</option>
                            <option value="total">Total</option>
                        </select>
                        @error('rules.0.discount_type')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="discount_unit">Discount Unit</label>
                        <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="rules[0][discount_unit]" required>
                            <option value="percent">Percent</option>
                            <option value="fixed">Fixed Amount</option>
                        </select>
                        @error('rules.0.discount_unit')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="tag">Tag</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="rules[0][tag]" placeholder="Enter tag">
                        @error('rules.0.tag')
                            <span class="text-red-500 text-sm">{{ $message }}</span>
                        @enderror
                    </div>
                    <button type="button" class="btn-remove-rule bg-red-500 text-white px-4 py-2 rounded">Remove Rule</button>
                </div>
            </div>
            <button type="button" id="addRule" class="bg-blue-500 text-white px-4 py-2 rounded">Add Rule</button>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Discount</button>
        </div>
    </form>
</div>
@endsection
@section('js')
<script>
    let ruleIndex = 1;

    document.getElementById('addRule').addEventListener('click', function() {
        const rulesContainer = document.getElementById('rulesContainer');
        const newRule = document.createElement('div');
        newRule.classList.add('rule', 'mb-4', 'p-4', 'border', 'rounded');
        newRule.innerHTML = `
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="buy_from">Buy From</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="rules[${ruleIndex}][buy_from]" placeholder="Enter buy from" required>
            </div>
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="buy_to">Buy To</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="rules[${ruleIndex}][buy_to]" placeholder="Enter buy to">
            </div>
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="discount_value">Discount Value</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="rules[${ruleIndex}][discount_value]" placeholder="Enter discount value" required>
            </div>
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="discount_type">Discount Type</label>
                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="rules[${ruleIndex}][discount_type]" required>
                    <option value="per_item">Per Item</option>
                    <option value="total">Total</option>
                </select>
            </div>
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="discount_unit">Discount Unit</label>
                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="rules[${ruleIndex}][discount_unit]" required>
                    <option value="percent">Percent</option>
                    <option value="fixed">Fixed Amount</option>
                </select>
            </div>
            <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="tag">Tag</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="rules[${ruleIndex}][tag]" placeholder="Enter tag">
            </div>
            <button type="button" class="btn-remove-rule bg-red-500 text-white px-4 py-2 rounded">Remove Rule</button>
        `;
        rulesContainer.appendChild(newRule);
        ruleIndex++;

        // Add event listener to the new remove button
        newRule.querySelector('.btn-remove-rule').addEventListener('click', function() {
            rulesContainer.removeChild(newRule);
        });
    });

    document.getElementById('rulesContainer').addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-remove-rule')) {
            const ruleToRemove = e.target.closest('.rule');
            ruleToRemove.parentNode.removeChild(ruleToRemove);
        }
    });
    document.getElementById('campaign_type').addEventListener('change', function() {
    const productSelection = document.getElementById('productSelection');
    if (this.value === 'discount by product') {
        productSelection.classList.remove('hidden');
    } else {
        productSelection.classList.add('hidden');
    }
});

document.getElementById('addProduct').addEventListener('click', function() {
    const productSelect = document.getElementById('productSelect');
    const selectedProductId = productSelect.value;
    const selectedProductName = productSelect.options[productSelect.selectedIndex].text;

    if (selectedProductId) {
        // Kiểm tra xem sản phẩm đã được thêm vào danh sách chưa
        const existingProducts = document.querySelectorAll('#productContainer .product-item');
        let productExists = false;

        existingProducts.forEach(item => {
            if (item.dataset.productId === selectedProductId) {
                productExists = true;
            }
        });

        if (productExists) {
            alert('This product has already been added.');
            return; // Ngừng thực hiện nếu sản phẩm đã tồn tại
        }

        // Tạo một div mới cho sản phẩm đã chọn
        const productContainer = document.getElementById('productContainer');
        const productDiv = document.createElement('div');
        productDiv.classList.add('mb-2', 'flex', 'items-center', 'product-item');
        productDiv.dataset.productId = selectedProductId; // Lưu ID sản phẩm vào data attribute
        productDiv.innerHTML = `
            <span class="mr-2">${selectedProductName}</span>
            <button type="button" class="remove-product ml-2 bg-red-500 text-white rounded p-1">
                <ion-icon name="close-outline"></ion-icon>
            </button>
        `;
        productContainer.appendChild(productDiv);

        // Thêm sự kiện cho nút xóa sản phẩm
        productDiv.querySelector('.remove-product').addEventListener('click', function() {
            productContainer.removeChild(productDiv);
            updateSelectedProducts();
        });

        // Reset dropdown
        productSelect.value = '';

        // Cập nhật trường ẩn selected_products
        updateSelectedProducts();
    } else {
        alert('Please select a product to add.');
    }
});

function updateSelectedProducts() {
    const selectedProducts = [];
    document.querySelectorAll('#productContainer .product-item').forEach(item => {
        selectedProducts.push(item.dataset.productId);
    });
    document.getElementById('selectedProducts').value = selectedProducts.join(',');
}


    
</script>
@endsection
