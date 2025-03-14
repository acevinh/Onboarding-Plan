<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DashBoardService;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class DashboardController extends Controller 
{
    protected DashBoardService $dashboardService;

    public function __construct(DashBoardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
        $this->middleware('permission:view dashboard', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
    
        $data = $this->dashboardService->dataDashboard($startDate, $endDate);
    
        return view('layouts.dashboard', compact('data'));
    }

    // Phương thức mới để xử lý yêu cầu AJAX
    public function getChartData(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
    
        // Gọi dịch vụ để lấy dữ liệu cho biểu đồ
        $data = $this->dashboardService->dataDashboard($startDate, $endDate);
    
        return response()->json($data['install_uninstall_data']);
    }

    
}