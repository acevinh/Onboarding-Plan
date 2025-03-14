@extends('index')
@section('css')
@endsection
@section('content')
    <div class="grid grid-cols-4 gap-x-5 justify-center">
        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    <ion-icon name="cart" style="color: green"></ion-icon>
                    <span>Stores Using App: 2</span>
                </h4>
            </div>
        </div>

        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    <ion-icon name="cart" style="color: red"></ion-icon>
                    <span>Stores Delete App: 2</span>
                </h4>
            </div>
        </div>

        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    <ion-icon name="card" style="color: green"></ion-icon>
                    <span>Stores Using App: 2</span>
                </h4>
            </div>
        </div>

        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    <ion-icon name="pricetag" style="color: green"></ion-icon>
                    <span>Stores Delete App: 2</span>
                </h4>
            </div>
        </div>
    </div>

    <div class="container mx-auto flex space-x-4 mt-4"> <!-- Add space-x-4 for horizontal spacing -->
        <div class="line-chart w-1/2 p-4">
            <div class="flex justify-center mt-4">
                <input type="date" id="startDate" class="input input-bordered mr-2" />
                <input type="date" id="endDate" class="input input-bordered mr-2" />
                <button id="filterBtn" class="btn">Filter</button>
            </div>
            <!-- Chart Container -->
            <div class="chart-container mt-6 h-96"> <!-- Set a fixed height -->
                <canvas id="lineChart" class="h-full"></canvas> <!-- Ensure canvas takes full height -->
            </div>
        </div>
        <div class="pie-chart w-1/2 p-4"> 
            <div class="chart-container w-full h-96 flex items-center justify-center"> 
                <canvas id="discountChart" class="h-full"></canvas> 
            </div>
        </div>
    </div>
@endsection 

@section('js')
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@latest"></script>
    <script>
        const ctx = document.getElementById('lineChart').getContext('2d');
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', '2023-10-06',
                    '2023-10-07'
                ], // Sample Dates
                datasets: [{
                        label: 'Daily Installs',
                        data: [10, 20, 15, 30, 25, 35, 40], // Sample Daily Installs
                        borderColor: 'blue',
                        fill: false,
                    },
                    {
                        label: 'Daily Uninstalls',
                        data: [5, 10, 7, 12, 8, 15, 10], // Sample Daily Uninstalls
                        borderColor: 'red',
                        fill: false,
                    },
                    {
                        label: 'Daily Paid',
                        data: [8, 15, 10, 20, 18, 22, 25], // Sample Daily Paid Counts borderColor: 'green',
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    }
                }
            }
        });


        const ctx1 = document.getElementById('discountChart').getContext('2d');
        const discountChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ['0 Discounts', '5 Discounts', '10 Discounts', 'More than 10 Discounts'],
                datasets: [{
                    label: 'Number of Stores',
                    data: [0, 5, 10, 15],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Stores by Discount Count'
                    }
                }
            }
        });
    </script>
@endsection
