<?php
class Employee
{
    protected $name;
    protected $salary;
    public function __construct($name, $salary)
    {
        $this->name = $name;
        $this->salary = $salary;
    }
    public function getDetail()
    {
        return "$this->name earns:  $this->salary";
    }
}
class Manager extends Employee  
{
    protected $department;
    public function __construct($name, $salary,$department )
    {
        parent::__construct($name, $salary);
        $this->department = $department;
    }
    public function getDetail()
    {
        return parent::getDetail() . ", and department: $this->department";
    }
}
class Developer extends Manager
{
   protected $programmingLanguage;
   public function __construct($name, $salary, $department, $programmingLanguage)
   {
       parent::__construct($name, $salary, $department); 
       $this->programmingLanguage = $programmingLanguage;
   }
    public function getDetail()
    {
        return parent::getDetail() . ", and programmingLanguage: $this->programmingLanguage ";
    }
}
$Manager=  new Developer('Hoang', 100000, 'sales', 'php');
echo $Manager->getDetail();
echo "<br>";
echo "Tính đa hình: " 
?>

<?php

interface Shape 
{
    public function area(); 
}

class Rectangle implements Shape
{
    protected $width;
    protected $height;

    public function __construct($width, $height)
    {
        $this->width = $width;
        $this->height = $height;
    }

    public function area()
    {
        return $this->width * $this->height;
    }
}

class Circle implements Shape
{
    protected $radius;

    public function __construct($radius)
    {
        $this->radius = $radius;
    }

    public function area()
    {
        return pi() * $this->radius * $this->radius;
    }
}

$shapes = [
    new Rectangle(5, 10),
    new Circle(7)
];

foreach ($shapes as $shape) {
    echo "Area: " . $shape->area() . "\n";
}
?>





