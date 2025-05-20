
import { useDashboard } from "../Hooks";
function DashBoardView() {
    const {
    // chartData,
    discountData,
    minDate,
    maxDate,
    lineChartRef,
    discountChartRef,
    handleFilter,
    setMinDate,
    setMaxDate,
  } = useDashboard();

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
