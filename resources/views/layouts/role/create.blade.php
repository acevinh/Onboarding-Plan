@extends('index')
@section('css')
    
@endsection

@section('content')

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Create New Role</h1>
    <form id="discountForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="{{ route('role.store') }}" method="POST">
        @csrf
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Role name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  name="name" type="text" placeholder="Enter Role name" required>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Permisson</label>
     @foreach ($permissions as $item)
         <input type="checkbox" name="permission[]" id="{{$item->id}}" value="{{$item->name}}">
         <label for="permission-{{$item->id}}">{{$item->name}}</label>
     @endforeach </div>
        <div class="flex items-center justify-between">
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Role</button>
        </div>
    </form>
</div>
@endsection
@section('js')

@endsection
