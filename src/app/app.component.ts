import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Employee } from './model/employee';
import { EmployeeService } from './employee.service'
import { Observable, Subject } from "rxjs";
//import { DataTableModule } from 'angular-datatable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-spring-curd-example';

  employeeForm: FormGroup;
  employee: Employee;
  employees: Observable<Employee[]>;
  submitted = false;
  isupdated = false;
  employeesArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  employeelist:any;  
  constructor(
    // private route :ActivatedRoute,
    // private router : Router,
    private formBuilder: FormBuilder,
    //private location : Location,
    private empService: EmployeeService
  ) {

    this.employee = new Employee;
  }


  ngOnInit() {

    this.employeeForm = this.formBuilder.group({
      emFirstName: ['', [Validators.required]],
      emLastName: ['', [Validators.required]],
      emDesignation: ['', [Validators.required]],
      emSalary: ['', [Validators.required]],

    });

    // Setting Empoyee table

    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };

    this.getEmployeeList();
  }
  // insert employee data 
  insertEmployee(): void {

    this.empService.save(this.employee).subscribe();
    //this.employeeForm.reset();

    //get emploee list
    this.getEmployeeList();

  }

  //getting all employee list
  getEmployeeList(): void {
    this.empService.getEmployeeList().subscribe(data => {
      this.employees = data;
      this.dtTrigger.next();
    });
  }
// delete employee by id
  deleteEmployee(id:number):void {

      this.empService.deleteEmployeById(id).subscribe();

     this.getEmployeeList();
  }
// get employee by id
 getEmployeeById(id:number) {

  this.empService.getEmployee(id).subscribe(data =>{
    this.employeelist=data;
  });
 } 

// form group of employee update

employeeupdateform = new FormGroup({
  emp_id: new FormControl(),
  emp_firstName: new FormControl(),
  emp_lastName: new FormControl(),
  emp_designation: new FormControl(),
  emp_salary: new FormControl()

});

 //update employee
 updateEmp(updstu) {
  this.employee = new Employee();
  this.employee.id = this.EmployeeId.value;
  this.employee.firstName = this.FirstName.value;
  this.employee.lastName = this.LastName.value;
  this.employee.designation = this.Designation.value;
  this.employee.salary = this.Salary.value;
  
   this.empService.updateEmployee(this.employee.id,this.employee).subscribe(data=>{
    this.isupdated =true;
    this.getEmployeeList();
   });
 }


 // update cancle function

 changeisUpdate(){  
  this.isupdated=false;  
}  

  // convenience getter for easy access to form fields
  get f() { return this.employeeForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }
  }


  // Getting employee value from employee-update-popup-form

  get EmployeeId () {
    return this.employeeupdateform.get("emp_id");
  }

  get FirstName () {
    return this.employeeupdateform.get("emp_firstName");
  }

  get LastName () {
    return this.employeeupdateform.get("emp_lastName");
  }

  get Designation () {
    return this.employeeupdateform.get("emp_designation");
  }

  get Salary () {

    return this.employeeupdateform.get("emp_salary");
  }
}
