import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import Chart from "chart.js/auto";

function DashBoardView() {
    const [chartData, setChartData] = useState({
        installs: [],
        uninstalls: [],
        labels: [],
    });
    const [discountData, setDiscountData] = useState({});
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const lineChartRef = useRef(null);
    const discountChartRef = useRef(null);

    // Fetch Data
    const fetchData = async (startDate = minDate, endDate = maxDate) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.get(
                `http://cmsremake.test/api/dashboard`,
                {
                    params: { startDate, endDate },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            const json = response.data;

            if (!json.success) {
                console.error("API returned failure");
                return;
            }

            const data = json.data;
            setChartData({
                installs: data.install_uninstall_data.map(
                    (item) => item.installs
                ),
                uninstalls: data.install_uninstall_data.map(
                    (item) => item.uninstalls
                ),
                labels: data.install_uninstall_data
                    .map((item) => item.date)
                    .filter(Boolean),
            });

            setDiscountData({
                ...data.discount_data,
                free: data.store_useFree,
                premium: data.store_usePremium,
                uninstalled: data.store_uninstalled,
                active: data.store_active,
            });

            setMinDate(data.oldest_date);
            setMaxDate(data.latest_date);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle Filter Button Click
    const handleFilter = () => {
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        if (startDate < minDate || endDate > maxDate) {
            alert(`Please select dates between ${minDate} and ${maxDate}`);
            return;
        }

        fetchData(startDate, endDate);
    };

    // Draw Line Chart on Data Change
    useEffect(() => {
        if (chartData.labels.length > 0 && lineChartRef.current) {
            const ctx = lineChartRef.current.getContext("2d");
            const lineChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: "Daily Installs",
                            data: chartData.installs,
                            borderColor: "rgba(59, 130, 246, 1)",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            fill: true,
                            tension: 0.3,
                        },
                        {
                            label: "Daily Uninstalls",
                            data: chartData.uninstalls,
                            borderColor: "rgba(239, 68, 68, 1)",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            fill: true,
                            tension: 0.3,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Installs vs Uninstalls",
                            font: {
                                size: 16,
                            },
                        },
                        legend: {
                            position: "top",
                        },
                    },
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                                tooltipFormat: "MMM d, yyyy",
                            },
                            title: {
                                display: true,
                                text: "Date",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Count",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });

            return () => {
                lineChart.destroy();
            };
        }
    }, [chartData]);

    // Draw Pie Chart on Discount Data Change
    useEffect(() => {
        if (
            discountData &&
            Object.keys(discountData).length > 0 &&
            discountChartRef.current
        ) {
            const ctx1 = discountChartRef.current.getContext("2d");
            const discountChart = new Chart(ctx1, {
                type: "pie",
                data: {
                    labels: [
                        "0 Discounts",
                        "5 Discounts",
                        "10 Discounts",
                        "More than 10 Discounts",
                    ],
                    datasets: [
                        {
                            label: "Number of Stores",
                            data: [
                                discountData["0"] || 0,
                                discountData["5"] || 0,
                                discountData["10"] || 0,
                                discountData["more_than_10"] || 0,
                            ],
                            backgroundColor: [
                                "rgba(239, 68, 68, 0.7)",
                                "rgba(59, 130, 246, 0.7)",
                                "rgba(234, 179, 8, 0.7)",
                                "rgba(16, 185, 129, 0.7)",
                            ],
                            borderColor: [
                                "rgba(239, 68, 68, 1)",
                                "rgba(59, 130, 246, 1)",
                                "rgba(234, 179, 8, 1)",
                                "rgba(16, 185, 129, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "right",
                        },
                        title: {
                            display: true,
                            text: "Stores by Discount Count",
                            font: {
                                size: 16,
                            },
                        },
                    },
                },
            });

            return () => {
                discountChart.destroy();
            };
        }
    }, [discountData]);

    // On initial load, fetch data
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="card bg-base-100 shadow-md border border-base-200">
                    <div className="card-body p-4">
                        <div className="flex items-center space-x-3">
                            <div
                                className="bg-green-500 p-3 rounded-full"
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "15px",
                                }}
                            >
                                <ion-icon
                                    name="cart"
                                    className="text-green-600 text-xl"
                                ></ion-icon>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Free Stores
                                </h3>
                                <p className="text-2xl font-bold">
                                    {discountData.free || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md border border-base-200">
                    <div className="card-body p-4">
                        <div className="flex items-center space-x-3">
                            <div
                                className="bg-blue-500 p-3 rounded-full"
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "15px",
                                }}
                            >
                                <ion-icon
                                    name="card"
                                    className="text-blue-600 text-xl"
                                ></ion-icon>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Premium Stores
                                </h3>
                                <p className="text-2xl font-bold">
                                    {discountData.premium || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md border border-base-200">
                    <div className="card-body p-4">
                        <div className="flex items-center space-x-3">
                            <div
                                className="bg-red-500 p-3 rounded-full"
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "15px",
                                }}
                            >
                                <ion-icon
                                    name="close-circle"
                                    className="text-red-600 text-xl"
                                ></ion-icon>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Uninstalled Stores
                                </h3>
                                <p className="text-2xl font-bold">
                                    {discountData.uninstalled || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md border border-base-200">
                    <div className="card-body p-4">
                        <div className="flex items-center space-x-3">
                            <div
                                className="bg-purple-500 p-3 rounded-full"
                                style={{
                                    height: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "50px",
                                    paddingTop: "15px",
                                }}
                            >
                                <ion-icon
                                    name="pricetag"
                                    className="text-purple-600 text-xl"
                                ></ion-icon>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Active Stores
                                </h3>
                                <p className="text-2xl font-bold">
                                    {discountData.active || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Line Chart */}
                <div className="card bg-base-100 shadow-md border border-base-200 flex-1">
                    <div className="card-body">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                            <h2 className="text-lg font-semibold">
                                Install/Uninstall Trend
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="date"
                                    id="startDate"
                                    className="input input-bordered input-sm"
                                    value={minDate}
                                    min={minDate}
                                    max={maxDate}
                                    onChange={(e) => setMinDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    id="endDate"
                                    className="input input-bordered input-sm"
                                    value={maxDate}
                                    min={minDate}
                                    max={maxDate}
                                    onChange={(e) => setMaxDate(e.target.value)}
                                />
                                <button
                                    onClick={handleFilter}
                                    className="btn btn-primary btn-sm gap-1"
                                >
                                    <ion-icon name="filter"></ion-icon>
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="h-80">
                            <canvas ref={lineChartRef}></canvas>
                        </div>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="card bg-base-100 shadow-md border border-base-200 flex-1">
                    <div className="card-body">
                        <h2 className="text-lg font-semibold mb-4">
                            Discount Distribution
                        </h2>
                        <div className="h-80">
                            <canvas ref={discountChartRef}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoardView;
