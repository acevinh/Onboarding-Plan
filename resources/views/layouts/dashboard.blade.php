@extends('index')
@section('css')
@endsection
@section('content')
    <div class="grid grid-cols-4 gap-x-5 justify-center">
        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    <ion-icon name="cart" style="color: green"></ion-icon>
                    <span>Free Stores: {{$data['store_useFree']}}</span>
                </h4>
            </div>
        </div>

        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    <ion-icon name="card" style="color: green"></ion-icon>
                    <span>Premium Stores: {{$data['store_usePremium']}}</span>
                </h4>
            </div>
        </div>

        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    
                    <ion-icon name="cart" style="color: red"></ion-icon>

                    <span>Uninstalled Stores: {{$data['store_uninstalled']}}</span>
                </h4>
            </div>
        </div>

        <div class="card bg-yellow-400 text-black shadow-sm">
            <div class="card-body">
                <h4 class="card-title text-base flex items-center space-x-1 w-full">
                    <ion-icon name="pricetag" style="color: green"></ion-icon>
                    <span>Active Stores: {{$data['store_active']}}</span>
                </h4>
            </div>
        </div>
    </div>

    <div class="container mx-auto flex space-x-4 mt-4">
        <div class="line-chart w-1/2 p-4">
            <div class="flex justify-center mt-4">
                <input type="date" id="startDate" class="input input-bordered mr-2" value="{{ $data['oldest_date'] }}" min="{{ $data['oldest_date'] }}" max="{{ $data['latest_date'] }}" />
                <input type="date" id="endDate" class="input input-bordered mr-2" value="{{ $data['latest_date'] }}" min="{{ $data['oldest_date'] }}" max="{{ $data['latest_date'] }}" />
                <button id="filterBtn" class="btn">Filter</button>
            </div>
            <div class="chart-container mt-6 h-96">
                <canvas id="lineChart" class="h-full"></canvas>
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
   const defaultData = @json($data['install_uninstall_data']);
const defaultLabels = defaultData.map(item => item.date);
const defaultInstalls = defaultData.map(item => item.installs);
const defaultUninstalls = defaultData.map(item => item.uninstalls);


const minDate = defaultLabels[0];
const maxDate = defaultLabels[defaultLabels.length - 1];


document.getElementById('startDate').setAttribute('min', minDate);
document.getElementById('startDate').setAttribute('max', maxDate);
document.getElementById('endDate').setAttribute('min', minDate);
document.getElementById('endDate').setAttribute('max', maxDate);

const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: defaultLabels,
        datasets: [
            {
                label: 'Daily Installs',
                data: defaultInstalls,
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Daily Uninstalls',
                data: defaultUninstalls,
                borderColor: 'red',
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

document.getElementById('filterBtn').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;


    if (startDate < minDate || endDate > maxDate) {
        alert('Vui lòng chọn ngày trong khoảng từ ' + minDate + ' đến ' + maxDate);
        return;
    }

    
    console.log(`Fetching data from ${startDate} to ${endDate}`);

    fetch(`/dashboard/chart-data?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 

            
            if (Array.isArray(data) && data.length > 0) {
                const labels = data.map(item => item.date);
                const installs = data.map(item => item.installs);
                const uninstalls = data.map(item => item.uninstalls);

                lineChart.data.labels = labels;
                lineChart.data.datasets[0].data = installs;
                lineChart.data.datasets[1].data = uninstalls;
                lineChart.update();
            } else {
                console.error('Dữ liệu không hợp lệ hoặc rỗng');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

    const discountData = @json($data['discount_data']);
    const ctx1 = document.getElementById('discountChart').getContext('2d');
    const discountChart = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['0 Discounts', '5 Discounts', '10 Discounts', 'More than 10 Discounts'],
            datasets: [{
                label: 'Number of Stores',
                data: [
                    discountData['0'],
                    discountData['5'],
                    discountData['10'],
                    discountData['more_than_10']
                ],
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