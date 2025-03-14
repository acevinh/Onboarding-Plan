@extends('index')
@section('css')
    
@endsection
@section('content')
{{-- @dd($data->role) --}}
<h1 class="w-full text-center text-lg font-bold m-8">User List <ion-icon name="albums-outline"></ion-icon></h1>

<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <!-- head -->
      <thead>
        <tr class="text-center">
          {{-- <th></th> --}}
          <th>Username</th> 
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Role</th>
         @can('edit user')
           <th>Actions</th>  
         @endcan
          
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        @foreach ($data as $item)
           <tr class="text-center">
          {{-- <th>{{$index + 1}}</th> --}}
          <td>{{$item['username']}}</td>
          <td>{{$item['email']}}</td>
          <td>{{$item['phone'] ?? 'No phone set.'}}</td>
          <td>{{$item['status']}}</td>
          <td>
           {{$item->roles->pluck('name')->implode(', ')}}
          </td>
          @can('edit user')
      
          <td class="inline-block">
            <a href="{{route('user.edit', $item['id'])}}"><button class="btn btn-dash btn-warning">Edit</button> </a>
          
          </td>
          @endcan
        </tr> 
        @endforeach
        

      </tbody>
    </table>
  </div>
@endsection
@section('js')
    
@endsection