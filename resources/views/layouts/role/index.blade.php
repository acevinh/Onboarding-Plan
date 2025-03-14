@extends('index')
@section('css')
    
@endsection
@section('content')
{{-- @dd($data->role) --}}
<h1 class="w-full text-center text-lg font-bold m-8">Role list<ion-icon name="albums-outline"></ion-icon></h1>
@can('create role')
<a href="{{route('role.create')}}"><button class="btn btn-primary">Create new role</button> </a>
@endcan

<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <!-- head -->
      <thead>
        <tr class="text-center">
          <th>Role name</th> 
          <th>Permission</th>
          <th>Created</th>
          @can('update role'|| 'delete role')
             <th>Actions</th>  
          @endcan
         
        </tr>
      </thead>
      <tbody>
       @foreach ($roles as $item)
           <tr class="text-center">
            <td>
                {{$item->name}}
            </td>
            <td>
              @if (empty($item->permissions))
                  no permission set.
              @else
                {{$item->permissions->pluck('name')->implode(', ')}}  
              @endif
              
            </td>
            <td>{{$item->created_at}}</td>
            <td>
@can('update role')

             <a href="{{route('role.edit', $item->id)}}"><button class="btn btn-warning">Update</button></a>   
@endcan
@can('delete role')
     <form action="{{route('role.delete', $item->id)}}" method="POST">
                @csrf
                @method('DELETE')
                <button class="btn btn-danger"  onclick="return confirm('Are you sure you want to delete this role?');">Delete</button>
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