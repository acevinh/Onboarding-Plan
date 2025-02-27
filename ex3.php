<?php
// phân biệt stack và queue
// Stack(ngăn xếp): lấy phần tử được thêm vào sau cùng nhất
// Queue(hàng đợi): phần tử được thêm vào trước sẽ lấy ra trước tiên 
class Stack
{
    private $items = [];
    public function push($item)
    {
        array_push($this->items, $item);
    }
    public function pop()
    {
        if ($this->isEmpty()) {
            return null;
        }
        return array_pop($this->items);
    }


    public function isEmpty()
    {
        return empty($this->items);
    }

    public function size()
    {
        return count($this->items);
    }
}

class Queue
{
    private $items = [];

    public function enqueue($item)
    {
        array_push($this->items, $item);
    }


    public function dequeue()
    {
        if ($this->isEmpty()) {
            return null;
        }
        return array_shift($this->items);
    }


    public function isEmpty()
    {
        return empty($this->items);
    }
    public function size()
    {
        return count($this->items);
    }
}

echo "Stack".'<br>';
$stack = new Stack();
$stack->push(1);
$stack->push(2);
$stack->push(3);

echo $stack->pop();
echo $stack->pop();

// Ví dụ sử dụng Queue
echo "Queue";
$queue = new Queue();
$queue->enqueue(1);
$queue->enqueue(2);
$queue->enqueue(3);
echo $queue->dequeue();
echo $queue->dequeue();
