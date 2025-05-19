<?php

namespace App\Services;

use App\Repositories\DashBoardInterface;

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
        if ($startDate && $endDate) {
            $data['install_uninstall_data'] = $this->dashboardInterface->getInstallUninstallData($startDate, $endDate);
        } else {
            $data['install_uninstall_data'] = $this->dashboardInterface->getInstallUninstallData();
        }
        $data['oldest_date'] = $this->dashboardInterface->getOldestDate();
        $data['latest_date'] = $this->dashboardInterface->getLatestDate();
        $data['paid_free_data'] = $this->dashboardInterface->getPaidFreeData();
        $data['discount_data'] = $this->dashboardInterface->getDiscountData();

        return $data;
    }
}
