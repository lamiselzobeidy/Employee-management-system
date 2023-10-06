import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Department } from 'src/app/models/department.model';
import { GetDepartmentsAction, PostDepartmentAction, UpdateDepartmentAction, DeleteDepartmentAction } from 'src/app/store/departments/departments.action';
import { DepartmentState } from 'src/app/store/departments/departments.state';

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit {
  subs = new Subscription();
  @Select(DepartmentState.getDepartments)
  departments$: Observable<Department[]>;
  departmentsData: Department[];
  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.subscribeToDepartments();
    this.dispatchDepartmentsAction();

  }

  subscribeToDepartments() {
    this.subs.add(this.departments$.subscribe(response => {
      if (response?.length) this.departmentsData = response;
    }));
  }

  dispatchDepartmentsAction() {
    this.store.dispatch(new GetDepartmentsAction());
  }
  onAddMappingLine(mappingLine) {
    this.store.dispatch(new PostDepartmentAction(mappingLine));
  }

  onEditMappingLine(mappingLine) {
    this.store.dispatch(new UpdateDepartmentAction(mappingLine));
  }

  onDeleteMappingLine(id: number) {
    this.store.dispatch(new DeleteDepartmentAction(id));
  }
}
