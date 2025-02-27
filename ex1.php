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
?>





