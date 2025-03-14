@extends('index')
@section('css')
    
@endsection
@section('content')
{{-- @dd($data) --}}
<h1 class="w-full text-center text-lg font-bold m-8">Store List <ion-icon name="albums-outline"></ion-icon></h1>
@if (session('success'))
    <div class="alert alert-success">
        <div class="flex justify-between">
            <span>{{ session('success') }}</span>
            {{-- <button class="btn btn-sm btn-circle btn-ghost" onclick="this.parentElement.parentElement.remove();">✖</button> --}}
        </div>
    </div>
@endif

@if (session('error'))
    <div class="alert alert-error">
        <div class="flex justify-between">
            <span>{{ session('error') }}</span>
            {{-- <button class="btn btn-sm btn-circle btn-ghost" onclick="this.parentElement.parentElement.remove();">✖</button> --}}
        </div>
    </div>
@endif
<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <!-- head -->
      <thead>
        <tr class="text-center">
          {{-- <th></th> --}}
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Country</th>
          <th>Install date</th>
          <th>Uninstall date</th>
          <th>Plan (paid/free)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        @foreach ($data as $item)
           <tr class="text-center">
          {{-- <th>{{$index + 1}}</th> --}}
          <td>{{$item['name']}}</td>
          <td>{{$item['email']}}</td>
          <td>{{$item['phone']}}</td>
          <td>{{$item['country']}}</td>
          <td>{{$item['install_date'] }} </td>
          <td>{{$item['uninstall_date'] ?? "no uninstall"}}</td>
          <td>{{$item['plan']}}</td>
          <td class="inline-block">
            <a href="{{route('store.details',$item['id'])}}"><button class="btn btn-dash btn-info">Details</button> </a>
            @can('store delete')
                <form action="{{ route('store.delete', $item['id']) }}" method="POST" style="display: inline;">
              @csrf
              @method('DELETE')
              <button type="button" class="btn btn-dash btn-error" onclick="if(confirm('Bạn có chắc chắn muốn xóa store này !')) { this.closest('form').submit(); }">Delete</button>
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