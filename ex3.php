<?php
class Stack
{
    private $items = [];
    private $top = -1;

    public function push($item)
    {
        $this->top++;
        $this->items[$this->top] = $item;
    }

    public function pop()
    {
        if ($this->isEmpty()) {
            return null;
        }
        $item = $this->items[$this->top];
        $this->top--;
        return $item;
    }

    public function isEmpty()
    {
        return $this->top === -1;
    }
}

class Queue
{
    private $items = [];
    private $front = 0;
    private $rear = 0;

    public function enqueue($item)
    {
        $this->items[$this->rear] = $item;
        $this->rear++;
    }

    public function dequeue()
    {
        if ($this->isEmpty()) {
            return null;
        }
        $item = $this->items[$this->front];
        $this->front++;
        return $item;
    }

    public function isEmpty()
    {
        return $this->front === $this->rear;
    }
}

echo "Stack:\n";
$stack = new Stack();
$stack->push(1);
$stack->push(2);
$stack->push(3);
echo $stack->pop() . "\n";
echo $stack->pop() . "\n";

echo "Queue:\n";
$queue = new Queue();
$queue->enqueue(1);
$queue->enqueue(2);
$queue->enqueue(3);
echo $queue->dequeue() . "\n";
echo $queue->dequeue() . "\n";
?>
