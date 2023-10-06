import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeState } from 'src/app/store/employees/employees.state';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { DepartmentState } from 'src/app/store/departments/departments.state';
import { Department } from 'src/app/models/department.model';
import { GetDepartmentsAction } from 'src/app/store/departments/departments.action';


@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.css']
})
export class ActionDialogComponent {
  dialogData: any;
  fieldLabels: string[];
  dialogTitle: string;
  dialogMode: string;
  subs = new Subscription();
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  dialogForm = new FormGroup({});
  @Select(DepartmentState.getDepartments)
  departments$: Observable<Department[]>;
  departmentsData: Department[];
  @Input() set data(value) {
    this.dialogData = value.row ?? value.columns;
    this.dialogTitle = value.title;
    this.dialogMode = value.mode;
    this.fieldLabels = value.columns ?? Object.keys(this.dialogData);
    this.dialogForm = this.toFormGroup(this.fieldLabels, this.dialogData);
    this.subs.add(this.departments$.subscribe(response => {
      if (response?.length) this.departmentsData = response;
    }));
    this.checkForDropDownValues(value.row ?? value.columns);
  }
  constructor(
    private store: Store,
  ) { }

  toFormGroup(fields: string[], dialogData) {
    const group: any = {};
    console.log(fields)
    fields.forEach(field => {
      group[field] = new FormControl(dialogData[field] !== undefined ? dialogData[field] : '');
    });
    return new FormGroup(group);
  }

  checkForDropDownValues(object: any) {
    if (object.hasOwnProperty('department') || (object.length && object.includes('department'))) {
      this.store.dispatch(new GetDepartmentsAction());
    }

  }

  passBack() {
    const returnData = {
      id: this.dialogData.id,
      ...this.dialogForm.value
    }
    this.passEntry.emit(returnData);
  }
  returnZero() {
    return 0
  }
  closeDialog() {
    const event = new KeyboardEvent("keydown",{
      'key': 'Escape'
      });
      document.dispatchEvent(event);
  }
}
