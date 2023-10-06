import { Employee } from "src/app/models/employee.model";

export class GetEmployeesAction {
  static readonly type = '[Employee] GET Employees ';
  constructor() { }
}

export class PostEmployeeAction {
  static readonly type = '[Employee] POST Employees '
  constructor(public payload: Employee) { }
}

export class DeleteEmployeeAction {
  static readonly type = '[Employee] DELETE Employees '
  constructor(public employeeID: number) { }
}

export class UpdateEmployeeAction {
  static readonly type = '[Employee] UPATE Employees '
  constructor(public payload: Employee) { }
}
