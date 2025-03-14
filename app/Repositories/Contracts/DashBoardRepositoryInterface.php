<?php
namespace App\Repositories\Contracts;
interface DashBoardRepositoryInterface
{
    public function getAllStore();
    public function getFreeStores();
    public function getPremiumStores();
    public function countUninstalledStores();
    public function  countActiveStores();

}