<?php
function isFibonacci($number)
{
    if (empty($number)) {
        return false;
    }
    $number = array_map('intval', $number);
    $n = count($number);
    if ($n < 3) {
        return $n === 1 && $number[0] === 0 || $n === 2 && $number[0] === 0 && $number[1] === 1;
    }
    for ($i = 2; $i < $n; $i++) {
        if ($number[$i] !== $number[$i - 1] + $number[$i - 2]) {
            return false;
        }
    }
    return true;
}
$n1 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
$n2 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 36];
echo isFibonacci($n1) ? "là dãy số fibonacci " : "không là dãy số fibonacci ";
echo isFibonacci($n2) ? "là dãy số fibonacci " : "không là dãy số fibonacci ";
