import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees/');
  }

  createEmployee(payload: Employee): Observable<any> {
    return this.http.post<Employee>('http://localhost:3000/employees/', payload);
  }

  updateEmployee(payload: any): Observable<any> {
    return this.http.put<Employee>(`http://localhost:3000/employees/${payload.id}/`, payload);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<Employee>(`http://localhost:3000/employees/${employeeId}/`);
  }
}
