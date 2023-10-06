import { Department } from "src/app/models/department.model"

export class GetDepartmentsAction {
  static readonly type = '[Department] GET Departments ';
  constructor() { }
}

export class PostDepartmentAction {
  static readonly type = '[Department] POST Departments '
  constructor(public payload: Department) { }
}

export class DeleteDepartmentAction {
  static readonly type = '[Department] DELETE Departments '
  constructor(public departmentID: number) { }
}

export class UpdateDepartmentAction {
  static readonly type = '[Department] UPATE Departments '
  constructor(public payload: Department) { }
}
