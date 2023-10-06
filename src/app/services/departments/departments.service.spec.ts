import { TestBed } from '@angular/core/testing';

import { DepartmentsService } from './departments.service';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Department } from 'src/app/models/department.model';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let httpTestingController: HttpTestingController;
  let httpMock: HttpTestingController;
  let departmentMockRequest = {
    id: 1,
    name: 'Department',
    order: 1,
    Active: true,
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [DepartmentsService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(DepartmentsService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all departments', () => {
    service.getDepartments().subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Department>) => request.url.includes('http://localhost:3000/departments/'));
    expect(req.request.method).toBe('GET');
  });

  it('should create a new department', () => {
    service.createDepartment(departmentMockRequest).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Department>) => request.url.includes('http://localhost:3000/departments/'));
    expect(req.request.method).toBe('POST');
    req.flush(departmentMockRequest);
  });

  it('should edit department', () => {
    service.updateDepartment(departmentMockRequest).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Department>) => request.url.includes('http://localhost:3000/departments/'));
    expect(req.request.method).toBe('PUT');
    req.flush(departmentMockRequest);
  });

  it('should delete department', () => {
    service.deleteDepartment(departmentMockRequest.id).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });
    const req = httpMock.expectOne((request: HttpRequest<Department>) => request.url.includes('http://localhost:3000/departments/'));
    expect(req.request.method).toBe('DELETE');
    req.flush(departmentMockRequest.id);
  });
});
