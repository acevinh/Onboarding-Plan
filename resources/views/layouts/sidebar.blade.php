
    <div class="sdide-bar bg-base-200 shadow-md rounded-lg w-1/4 h-screen ml-3 p-3">
      
                <ul class="menu">
                    @can('view dashboard')
                    <li>
                        <a href="{{ route('dashboard') }}" class="menu-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                            <ion-icon name="pie-chart-outline"></ion-icon>
                            Dashboard
                        </a>
                    </li>
                    @endcan
                   @can('view store')
                         <li>
                        <a href="{{ route('store.list') }}" class="menu-item {{ request()->routeIs('store.list') ? 'active' : '' }}">
                            <ion-icon name="storefront-outline"></ion-icon>
                            Store List
                        </a>
                    </li>
                   @endcan
                  @can('view user')
                       <li>
                        <a href="{{ route('user.index') }}" class="menu-item {{ request()->routeIs('user.index') ? 'active' : '' }}">
                            <ion-icon name="people-circle-outline"></ion-icon>
                            User List
                        </a>
                    </li> 
                  @endcan
                  @can('view role')
                       <li>
                        <a href="{{ route('role.index') }}" class="menu-item {{ request()->routeIs('role.index') ? 'active' : '' }}">
                            <ion-icon name="glasses-outline"></ion-icon>
                            Role List
                        </a>
                    </li> 
                  @endcan

                  @can('view permission')
                     <li>
                        <a href="{{ route('permission.index') }}" class="menu-item {{ request()->routeIs('permission.index') ? 'active' : '' }}">
                            <ion-icon name="build-outline"></ion-icon>
                            Permission List
                        </a>
                    </li> 
                  @endcan
                    
                    {{-- <li>
                        <details>
                            <summary class="menu-item">
                                <ion-icon name="pricetag-outline"></ion-icon> Discounts
                            </summary>
                            <ul class="pl-4">
                                <li>
                                    <a href="{{ route('discounts.create', ['store_id' => 1]) }}" class="menu-item {{ request()->routeIs('discounts.create') ? 'active' : '' }}">
                                        Add New Discount
                                    </a>
                                </li>
                                <li>
                                    <a href="{{ route('discounts.edit', ['id' => 1]) }}" class="menu-item {{ request()->routeIs('discounts.edit') ? 'active' : '' }}">
                                        Edit Discount
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li> --}}
                </ul>
    </div>
 