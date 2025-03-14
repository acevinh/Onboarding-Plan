<?php

namespace App\Repositories;

use App\Repositories\Contracts\DashBoardRepositoryInterface;
use App\Models\Store;

class DashBoardInterface implements DashBoardRepositoryInterface
{
    protected Store $model;

    public function __construct(Store $store)
    {
        $this->model = $store;
    }

    public function getAllStore()
    {
        return $this->model->all();
    }

    public function getFreeStores()
    {
        return $this->model->where('plan', 'free')->get();
    }

    public function getPremiumStores()
    {
        return $this->model->where('plan', 'premium')->get();
    }

    public function countUninstalledStores()
    {
        return $this->model->whereNotNull('uninstall_date')
            ->whereColumn('uninstall_date', '>', 'install_date')
            ->count();
    }

    public function countActiveStores()
    {
        return $this->model->where(function ($query) {
            $query->whereNull('uninstall_date')
                ->orWhereColumn('uninstall_date', '<', 'install_date');
        })->count();
    }

    public function getInstallUninstallData($startDate = null, $endDate = null)
    {
        $query = $this->model->selectRaw('DATE(install_date) as date, 
            COUNT(CASE WHEN uninstall_date IS NULL THEN 1 END) as installs, 
            COUNT(CASE WHEN uninstall_date IS NOT NULL THEN 1 END) as uninstalls');

        if ($startDate && $endDate) {
            $query->whereBetween('install_date', [$startDate, $endDate]);
        }

        return $query->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    public function getPaidFreeData($startDate = null, $endDate = null)
    {
        return $this->model->selectRaw('DATE(install_date) as date, 
            COUNT(CASE WHEN plan = "free" THEN 1 END) as free, 
            COUNT(CASE WHEN plan = "premium" THEN 1 END) as premium')
            ->whereBetween('install_date', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    public function getDiscountData()
    {
        return [
            '0' => $this->model->whereDoesntHave('discounts')->count(),
            '5' => $this->model->has('discounts', '=', 5)->count(),
            '10' => $this->model->has('discounts', '=', 10)->count(),
            'more_than_10' => $this->model->has('discounts', '>', 10)->count(),
        ];
    }

    public function getOldestDate()
    {
        $oldestDate = $this->model->min('install_date');


        if ($oldestDate) {
            return \Carbon\Carbon::parse($oldestDate)->format('Y-m-d');
        }

        return null;
    }

    public function getLatestDate()
    {
        $latestDate = $this->model->max('install_date');
        if ($latestDate) {
            return \Carbon\Carbon::parse($latestDate)->format('Y-m-d');
        }

        return null;
    }
}
