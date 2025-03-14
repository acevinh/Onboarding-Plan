<?php 
namespace App\Repositories;

use App\Models\Product;


class ProductRepository implements ProductRepositoryInterface
{
    protected $model;
    public function __construct(Product $model){
        $this->model = $model;
    }
    public function getAll()
    {
        return $this->model->get();
    }

    public function findById($id)
    {
        return $this->model->where('id', $id)->get();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $product =$this->model->findOrFail($id);;
        if ($product) {
            $product->update($data);
            return $product;
        }
        return null;
    }

    public function delete($id)
    {
        $item= $this->model->findOrFail($id);
        if($item){
            $item->delete();
            return true;
        }
        return false;
    }
}
