import { Component, OnInit } from '@angular/core';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { DeleteEmployeeAction, GetEmployeesAction, PostEmployeeAction, UpdateEmployeeAction } from 'src/app/store/employees/employees.action';
import { EmployeeState } from 'src/app/store/employees/employees.state';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit {
  subs = new Subscription();
  @Select(EmployeeState.getEmployees)
  employees$: Observable<Employee[]>;
  employeesData: Employee[];
  constructor(
    private store: Store,
    private actions: Actions
  ) { }

  ngOnInit(): void {
    this.subscribeToEmployees();
    this.dispatchEmployeesAction();

  }

  subscribeToEmployees() {
    this.subs.add(this.employees$.subscribe(response => {
      if (response?.length) this.employeesData = response;
    }));
  }

  dispatchEmployeesAction() {
    this.store.dispatch(new GetEmployeesAction());
  }
  onAddMappingLine(mappingLine) {
    this.store.dispatch(new PostEmployeeAction(mappingLine));
  }

  onEditMappingLine(mappingLine) {
    this.store.dispatch(new UpdateEmployeeAction(mappingLine));
  }

  onDeleteMappingLine(id: number) {
    this.store.dispatch(new DeleteEmployeeAction(id));
  }
}
