import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './model/employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }


  // save employee information

  public save(employee: Employee) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('test:test123') });
    return this.http.post<Employee>('http://localhost:8085/employees', employee, { headers });
  }
  // get employee list
  public getEmployeeList(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('test:test123') });
    return this.http.get<Employee>('http://localhost:8085/all-employee', { headers });
  }

  // delete emlpoyee
  public deleteEmployeById(id:number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('test:test123') });
    return this.http.delete('http://localhost:8085/delete-employee/'+id,{headers});
  }

  // get employee by id

  getEmployee(id:number):Observable<Object> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('test:test123') });
    return this.http.get('http://localhost:8085/getEmployee/'+id,{headers});
  }

// update employee information

updateEmployee (id:number,emlpoyee:Employee ):Observable<Object>{
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('test:test123') });
  return this.http.post('http://localhost:8085/updateEmployee/'+id,emlpoyee,{headers});
}
}
