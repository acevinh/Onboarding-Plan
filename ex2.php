<?php
function isFibonacci($numbers)
{
    if (empty($numbers)) {
        return false;
    }

    $n = count($numbers);

   
    if ($n === 1) {
        return $numbers[0] === 0;
    }
    if ($n === 2) {
        return $numbers[0] === 0 && $numbers[1] === 1;
    }

   
    for ($i = 2; $i < $n; $i++) {
        if (bcadd($numbers[$i - 1], $numbers[$i - 2]) !== (string)$numbers[$i]) {
            return false;
        }
    }

    return true;
}

$n1 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
$n2 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 36];


$n3 = ["0", "1", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "144", "233", "377", "610", "987", "1597", "2584", "4181", "6765", "10946", "17711", "28657", "46368", "75025", "121393", "196418", "317811", "514229", "832040", "1346269", "2178309", "3524578", "5702887", "9227465", "14930352", "24157817", "39088169", "63245986", "102334155", "165580141", "267914296", "433494437", "701408733", "1134903170", "1836311903"];

echo isFibonacci($n1) ? "là dãy số Fibonacci<br>" : "không là dãy số Fibonacci<br>";
echo isFibonacci($n2) ? "là dãy số Fibonacci<br>" : "không là dãy số Fibonacci<br>";
echo isFibonacci($n3) ? "là dãy số Fibonacci<br>" : "không là dãy số Fibonacci<br>";
?>
