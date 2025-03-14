<!DOCTYPE html>
<html lang="en" data-theme="bumblebee">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dash board 1</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.24/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.4.0/esm/ionicons.min.js" integrity="sha512-heZj7rPbZHWyOEhE34vsJkzj2DKK2mZ9D3jjMkXQJ0uMGu/m5iOty+le26NL1eFZ5+qa4XBYcflwYwITwCWufw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    @yield('css')
</head>

<body>
@include('blocks.header')
    <div class="flex mt-6">
      @include('layouts.sidebar')
      <div class="w-3/4 ml-2 border-2 border-dotted rounded-lg p-4">    
          @yield('content')
      </div>
  </div>
   

</body>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
{{-- <script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@latest"></script> --}}
@yield('js')
<script>
     
        
        function setActive(element) {
          
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.classList.remove('active');
            });
    
          
            element.classList.add('active');
        }
    
</script>
</html>
