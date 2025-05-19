<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DashBoardService;

class DashboardController extends Controller
{
    protected DashBoardService $dashboardService;

    public function __construct(DashBoardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
        // $this->middleware('permission:view dashboard', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $data = $this->dashboardService->dataDashboard($startDate, $endDate);

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function getChartData(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $data = $this->dashboardService->dataDashboard($startDate, $endDate);

        return response()->json([
            'success' => true,
            'chartData' => $data['install_uninstall_data'] ?? []
        ]);
    }
}
