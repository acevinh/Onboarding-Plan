@extends('index')

@section('css')
    <style>
        .rotate-180 {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
        }
    </style>
@endsection

@section('content')
    {{-- @dd($data->discounts) --}}
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

    <div class="grid grid-cols-6 gap-4">
        <div class="col-span-4 border-2 border-solid rounded-lg h-auto">
            <h1 class="w-full text-center text-lg font-bold m-8">List of Discounts <ion-icon name="albums-outline"></ion-icon>
            </h1>

            <!-- Action Buttons -->
            <div class="flex justify-between p-4">
                @can('add new discount')
                    <a href="{{ route('discounts.create', ['store_id' => $data->id]) }}">
                        <button class="btn btn-primary">Add New Discount</button>
                    </a>
                @endcan
                <div class="flex space-x-2">
                    @can('delete discount')
                        <button class="btn btn-outline btn-error" id="deleteAll">Delete All</button>
                    @endcan

                    @can('active discount')

                    <button class="btn btn-outline btn-success" id="activeAll">Activate All</button>
                    <button class="btn btn-outline btn-warning" id="inactiveAll">Deactivate All</button>
                    @endcan
                </div>
            </div>



            <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr class="text-center">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox checkbox-success" id="checkAll" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Created At</th>
                            @can('active discount')
                              <th>Status</th>  
                            @endcan
                            
                            <th>More <ion-icon name="information-circle-outline"></ion-icon></th>
                            @can('update discount' || 'delete discount')

                            <th>Actions</th>
                            @endcan
                        </tr>
                    </thead>
                    <tbody>
                        @if ($data->discounts->isempty())
                            <tr>
                                <td colspan="7" class="text-center py-4">
                                    <strong>There is no discount yet.</strong>
                                </td>
                            </tr>
                        @else
                            @foreach ($data->discounts as $discount)
                                <tr class="text-center">
                                    <td>
                                        <label>
                                            <input type="checkbox" class="checkbox checkbox-success row-checkbox"
                                                data-id="{{ $discount->id }}" />
                                        </label>
                                    </td>
                                    <td>{{ $discount->campaign_name }}</td>
                                    <td>{{ $discount->campaign_code }}</td>
                                    <td>{{ \Carbon\Carbon::parse($discount->created_at)->format('d/m/Y') }}</td>
                            @can('active discount')
                                    
                                    <td>
                                        <input type="checkbox"
                                            class="toggle border-red-600 bg-red-500 checked:bg-green-400 checked:text-green-800 checked:border-green-500"
                                            data-id="{{ $discount->id }}" {{ $discount->status ? 'checked' : '' }} />
                                    </td>
                            @endcan
                                    <td>
                                        <button class="flex inline-block content-center btn btn-soft view-more-btn">
                                            See More <ion-icon class="m-1 chevron-icon"
                                                name="chevron-down-outline"></ion-icon>
                                        </button>
                                    </td>
                                    
                                    <td class="flex inline:block">
                                        @can('update discount')
                                        <a href="{{ route('discounts.edit', $discount->id) }}"><button
                                            class="btn btn-dash btn-warning">Edit Discount</button></a>
                                    @endcan
                                        
                                        @can('delete discount')
                                            <button class="btn btn-dash btn-error delete-btn"
                                                data-id="{{ $discount->id }}">Delete</button>
                                        @endcan
                                    </td>
                                </tr>
                                <tr class="hidden more-info-row">
                                    <td colspan="7">
                                        {{-- @if ($discount->campaign_type == 'buy_x_discount_y')
                                <strong>This discount applies to whole papules.</strong>
                                @else
                                @if (empty($discount->discountProducts))
                               <strong>No product yet.</strong>
                                    @else
                                    
                                    <h2>Apply to product: </h2>
                                    @foreach ($discount->discountProducts as $item)
                                       <p>{{$item->name}}</p> 
                                    @endforeach
                                @endif
                                @endif --}}

                                        <div class="p-4 bg-gray-100 rounded-lg">
                                            <table class="min-w-full">
                                                <thead>
                                                    <th class="font-bold px-4 py-2">ID:</th>
                                                    <th class="font-bold px-4 py-2">Buy From:</th>
                                                    <th class="font-bold px-4 py-2">Buy To:</th>
                                                    <th class="font-bold px-4 py-2">Discount Value:</th>
                                                    <th class="font-bold px-4 py-2">Discount Type:</th>
                                                    <th class="font-bold px-4 py-2">Discount Unit:</th>
                                                    {{-- <th class="font-bold px-4 py-2">Actions:</th> --}}
                                                </thead>
                                                <tbody>
                                                    @if ($discount->discountRules->isempty())
                                                        <tr>
                                                            <td colspan="7" class="text-center py-4">
                                                                <strong>No rules yet. You can add rules in the
                                                                    future.</strong>
                                                            </td>
                                                        </tr>
                                                    @else
                                                        @foreach ($discount->discountRules as $rule)
                                                            <tr>
                                                                <td class="px-4 py-2">{{ $rule->rule_id }}</td>
                                                                <td class="px-4 py-2">{{ $rule->buy_from }}</td>
                                                                <td class="px-4 py-2">{{ $rule->buy_to }}</td>
                                                                <td class="px-4 py-2">{{ $rule->discount_value }}</td>
                                                                <td class="px-4 py-2">{{ $rule->discount_type }}</td>
                                                                <td class="px-4 py-2">{{ $rule->discount_unit }}</td>
                                                                {{-- <td>  
                                                        <div class="flex mt-4">
                                                            <button class="btn btn-dash btn-warning">Edit Rule</button> --}}
                                                                {{-- <button class="btn btn-dash btn-error delete-btn" data-id="{{ $rule->id }}">Delete</button> --}}
                                                                {{-- </div>
                                                    </td> --}}
                                                            </tr>
                                                        @endforeach
                                                    @endif
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        @endif
                    </tbody>
                </table>
            </div>
        </div>

        {{-- Store Details --}}
        <div class="col-span-2 ">
            <div class="row ">
                <div class="card w-full bg-base-100 shadow-sm border-2 border-solid rounded-lg">
                    <div class="card-body">
                        <div class="flex justify-between">
                            <h2 class="text-3xl font-bold">Store Details</h2>
                        </div>
                        <table class="min-w-full mt-6 border-collapse">
                            <tbody>
                                <tr class="border-b">
                                    <td class="font-bold px-4 py-2">Name:</td>
                                    <td class="px-4 py-2">{{ $data->name }}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="font-bold px-4 py-2">Email:</td>
                                    <td class="px-4 py-2">{{ $data->email }}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="font-bold px-4 py-2">Phone:</td>
                                    <td class="px-4 py-2">{{ $data->phone }}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="font-bold px-4 py-2">Country:</td>
                                    <td class="px-4 py-2">{{ $data->country }}</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="font-bold px-4 py-2">Install Date:</td>
                                    <td class="px-4 py-2">
                                        {{ $data->install_date ? \Carbon\Carbon::parse($data->install_date)->format('d/m/Y') : 'N/A' }}
                                    </td>
                                </tr>
                                <tr class="border-b">
                                    <td class="font-bold px- 4 py-2">Uninstall Date:</td>
                                    <td class="px-4 py-2">
                                        {{ $data->uninstall_date ? \Carbon\Carbon::parse($data->uninstall_date)->format('d/m/Y') : 'N/A' }}
                                    </td>
                                </tr>
                                <tr class="border-b">
                                    <td class="font-bold px-4 py-2">Plan:</td>
                                    <td class="px-4 py-2">{{ $data->plan }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('js')
    <script>
        const checkAll = document.getElementById('checkAll');
        const rowCheckboxes = document.querySelectorAll('.row-checkbox');

        checkAll.addEventListener('change', function() {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = checkAll.checked;
            });
        });

        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (!checkbox.checked) {
                    checkAll.checked = false;
                } else {
                    const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
                    checkAll.checked = allChecked;
                }
            });
        });

        document.querySelectorAll('.view-more-btn').forEach(button => {
            button.addEventListener('click', function() {
                const moreInfoRow = this.closest('tr').nextElementSibling;
                moreInfoRow.classList.toggle('hidden');
                const icon = this.querySelector('.chevron-icon');
                icon.name = icon.name === 'chevron-down-outline' ? 'chevron-up-outline' :
                    'chevron-down-outline';
                icon.classList.toggle('rotate-180');
            });
        });
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('.toggle').change(function() {
                var checkbox = $(this);
                var discountId = checkbox.data('id');
                var status = checkbox.is(':checked') ? 1 : 0;

                if (confirm('Are you sure you want to change the status?')) {
                    $.ajax({
                        url: '/discounts/' + discountId + '/status',
                        type: 'POST',
                        data: {
                            status: status,
                            _token: '{{ csrf_token() }}'
                        },
                        success: function(response) {
                            if (response.success) {
                                alert('Status updated successfully!');
                            } else {
                                alert('Failed to update status.');
                            }
                        },
                        error: function() {
                            alert('An error occurred while updating the status.');
                        }
                    });
                } else {
                    checkbox.prop('checked', !status);
                }
            });

            $('.delete-btn').click(function() {
                var discountId = $(this).data('id');
                if (confirm('Are you sure you want to delete this discount?')) {
                    $.ajax({
                        url: '/discounts/delete/' + discountId,
                        type: 'DELETE',
                        data: {
                            _token: '{{ csrf_token() }}'
                        },
                        success: function(response) {
                            if (response.success) {
                                alert('Discount deleted successfully!');
                                location.reload();
                            } else {
                                alert('Failed to delete discount.');
                            }
                        },
                        error: function() {
                            alert('An error occurred while deleting the discount.');
                        }
                    });
                }
            });

            $('#deleteAll').click(function() {
                const selectedDiscounts = document.querySelectorAll('.row-checkbox:checked');
                if (selectedDiscounts.length === 0) {
                    alert('Please select at least one discount to delete.');
                    return;
                }

                if (confirm('Are you sure you want to delete the selected discounts?')) {
                    const discountIds = Array.from(selectedDiscounts).map(checkbox => checkbox.dataset.id);
                    $.ajax({
                        url: '/discounts/delete-multiple',
                        type: 'DELETE',
                        data: {
                            discountIds: discountIds,
                            _token: '{{ csrf_token() }}'
                        },
                        success: function(response) {
                            if (response.success) {
                                alert('Selected discounts deleted successfully!');
                                location.reload();
                            } else {
                                alert('Failed to delete selected discounts.');
                            }
                        },
                        error: function() {
                            alert('An error occurred while deleting the selected discounts.');
                        }
                    });
                }
            });

            $('#activeAll').click(function() {
                handleStatusUpdate(1);
            });

            $('#inactiveAll').click(function() {
                handleStatusUpdate(0);
            });

            function handleStatusUpdate(status) {
                const selectedDiscounts = document.querySelectorAll('.row-checkbox:checked');
                if (selectedDiscounts.length === 0) {
                    alert('Please select at least one discount to update.');
                    return;
                }

                const action = status === 1 ? 'activate' : 'deactivate';
                if (confirm(`Are you sure you want to ${action} the selected discounts?`)) {
                    const discountIds = Array.from(selectedDiscounts).map(checkbox => checkbox.closest('tr')
                        .querySelector('.toggle').dataset.id);
                    updateStatusForDiscounts(discountIds, status);
                }
            }

            function updateStatusForDiscounts(discountIds, status) {
                $.ajax({
                    url: '/discounts/update-status-multiple',
                    type: 'POST',
                    data: {
                        discountIds: discountIds,
                        status: status,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        if (response.success) {
                            alert('Status updated successfully!');
                            discountIds.forEach(id => {
                                const toggleCheckbox = document.querySelector(
                                    `.toggle[data-id="${id}"]`);
                                if (toggleCheckbox) {
                                    toggleCheckbox.checked = status === 1;
                                }
                            });
                        } else {
                            alert('An error occurred while updating the status.');
                        }
                    },
                    error: function() {
                        alert('An error occurred while sending the request.');
                    }
                });
            }
        });
    </script>
@endsection
