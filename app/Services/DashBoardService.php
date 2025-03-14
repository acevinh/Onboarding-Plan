<?php

namespace App\Services;

use App\Repositories\DashBoardInterface;
// use Exception;
class DashboardService
{
    protected $dashboardInterface;

    public function __construct(DashBoardInterface $dashboardInterface)
    {
        $this->dashboardInterface = $dashboardInterface;
    }
    public function dataDashboard($startDate = null, $endDate = null)
    {
        $data = [];

        $data['store_useFree'] = $this->dashboardInterface->getFreeStores()->count() ?? 0;
        $data['store_usePremium'] = $this->dashboardInterface->getPremiumStores()->count() ?? 0;
        $data['store_uninstalled'] = $this->dashboardInterface->countUninstalledStores() ?? 0;
        $data['store_active'] = $this->dashboardInterface->countActiveStores() ?? 0;

        // Lấy dữ liệu cho ngày cụ thể hoặc tất cả
        if ($startDate && $endDate) {
            $data['install_uninstall_data'] = $this->dashboardInterface->getInstallUninstallData($startDate, $endDate);
        } else {
            $data['install_uninstall_data'] = $this->dashboardInterface->getInstallUninstallData();
        }

        // Lấy ngày nhỏ nhất và ngày lớn nhất
        $data['oldest_date'] = $this->dashboardInterface->getOldestDate();
        $data['latest_date'] = $this->dashboardInterface->getLatestDate();

        // Lấy dữ liệu miễn phí và cao cấp
        $data['paid_free_data'] = $this->dashboardInterface->getPaidFreeData();

        // Lấy dữ liệu discount
        $data['discount_data'] = $this->dashboardInterface->getDiscountData();

        return $data;
    }
}
