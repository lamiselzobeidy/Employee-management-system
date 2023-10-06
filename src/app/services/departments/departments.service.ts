import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>('http://localhost:3000/departments/');
  }

  createDepartment(payload: Department): Observable<any> {
    return this.http.post<Department>('http://localhost:3000/departments/', payload);
  }

  updateDepartment(payload: any): Observable<any> {
    return this.http.put<Department>(`http://localhost:3000/departments/${payload.id}/`, payload);
  }

  deleteDepartment(departmentId: number): Observable<any> {
    return this.http.delete<Department>(`http://localhost:3000/departments/${departmentId}/`);
  }
}
