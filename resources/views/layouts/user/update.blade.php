@extends('index')
@section('css')
    
@endsection

@section('content')

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Update user</h1>
    <form id="discountForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="{{ route('user.update',$user['id']) }}" method="POST">
        @csrf
        {{-- @method('PUT') --}}
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">user name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="{{$user['username']}}"  name="name" type="text" placeholder="Enter user name" required>
        </div>  
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="{{$user['email']}}"  name="email" type="text" placeholder="Enter email" required>
        </div> 
       
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Permisson</label>
            {{-- {{($hasRoles->contains($item->id)) ? 'checked': ''}}  --}}
     @foreach ($roles as $item)
         <input  {{($hasRoles->contains($item->id)) ? 'checked': ''}} type="checkbox" name="role[]" id="role-{{$item->id}}" value="{{$item->name}}">
         <label for="role-{{$item->id}}">{{$item->name}}</label>
     @endforeach 
    </div>
        <div class="flex items-center justify-between">
            <button type="submit" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Update user</button>
        </div>
    </form>
</div>
@endsection
@section('js')

@endsection
