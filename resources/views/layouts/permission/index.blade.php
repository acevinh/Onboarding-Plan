@extends('index')
@section('css')
@endsection
@section('content')
    {{-- @dd($data->role) --}}
    <h1 class="w-full text-center text-lg font-bold m-8">Pemission list<ion-icon name="albums-outline"></ion-icon></h1>
    @can('create permission')
        <a href="{{ route('permission.create') }}"><button class="btn btn-primary">Create new permission</button> </a>
    @endcan

    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table class="table">
            <!-- head -->
            <thead>
                <tr class="text-center">
                    <th>Permisson name</th>
                    <th>Created</th>
                    @can('update permission' || 'delete permission')
                        <th>Actions</th>
                    @endcan

                </tr>
            </thead>
            <tbody>
                @foreach ($permissions as $item)
                    <tr class="text-center">
                        <td>
                            {{ $item->name }} 
                        </td>
                        <td>{{ $item->created_at }}</td>
                        <td>
                            @can('update permission')
                                <a href="{{ route('permission.edit', $item->id) }}"><button
                                        class="btn btn-warning">Update</button></a>
                            @endcan
                            @can('delete permission')
                                <form action="{{ route('permission.delete', $item->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-danger"
                                        onclick="return confirm('Are you sure you want to delete this permission?');">Delete</button>
                                </form>
                            @endcan
                        </td>
                    </tr>
                @endforeach


            </tbody>
        </table>
    </div>
@endsection
@section('js')
@endsection
