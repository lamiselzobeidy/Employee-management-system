import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { EmployeesService } from './employees.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpTestingController: HttpTestingController;
  let httpMock: HttpTestingController;
  let employeeMockRequest = {
    id: 1,
    name: 'employee',
    identification: 'identification',
    phone: '5493028',
    mobile: '012222856',
    Active: true,
    hireDate: new Date(10/10/2020),
    department: 'department',
    position: 'head',
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [EmployeesService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(EmployeesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all employees', () => {
    service.getEmployees().subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Employee>) => request.url.includes('/api/employees/'));
    expect(req.request.method).toBe('GET');
  });

  it('should create a new employee', () => {
    service.createEmployee(employeeMockRequest).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Employee>) => request.url.includes('/api/employees/'));
    expect(req.request.method).toBe('POST');
    req.flush(employeeMockRequest);
  });

  it('should edit employee', () => {
    service.updateEmployee(employeeMockRequest).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Employee>) => request.url.includes('/api/employees/'));
    expect(req.request.method).toBe('PUT');
    req.flush(employeeMockRequest);
  });

  it('should delete employee', () => {
    service.deleteEmployee(employeeMockRequest.id).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Employee>) => request.url.includes('/api/employees/'));
    expect(req.request.method).toBe('DELETE');
    req.flush(employeeMockRequest.id);
  });
});
