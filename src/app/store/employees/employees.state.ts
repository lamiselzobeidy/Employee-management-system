import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetEmployeesAction, DeleteEmployeeAction, PostEmployeeAction, UpdateEmployeeAction } from "./employees.action";
import { EmployeesService } from "src/app/services/employees/employees.service";
import { Employee } from "src/app/models/employee.model";

interface EmployeeStateModel {
  employees: Employee[];
}

@State<EmployeeStateModel>({
  name: 'EmployeeState'
})
@Injectable()
export class EmployeeState {
  constructor(
    private employeeSerive: EmployeesService,
  ) { }

  @Selector()
  public static getEmployees(state: EmployeeStateModel) {
    return state.employees;
  }

  @Action(GetEmployeesAction)
  public getemployeeSettings(
    { patchState }: StateContext<EmployeeStateModel>,
    { }: GetEmployeesAction) {
    this.employeeSerive.getEmployees().subscribe(response => {
      patchState({ employees: response })
    }, err => {
      throw err;
    })
  }

  @Action(PostEmployeeAction)
  public postEmployeeAction(
    { setState, getState, dispatch }: StateContext<EmployeeStateModel>,
    { payload }: PostEmployeeAction) {
    const mappedEmployees = getState().employees;
    this.employeeSerive.createEmployee(payload).subscribe((response) => {
      setState({ employees: [...mappedEmployees, response] });
    }, err => {
      throw err
    })
  }

  @Action(DeleteEmployeeAction)
  public deleteEmployeeAction(
    { getState, setState }: StateContext<EmployeeStateModel>,
    { employeeID }: DeleteEmployeeAction) {
    let mappedEmployees = getState().employees;
    this.employeeSerive.deleteEmployee(employeeID).subscribe(() => {
      mappedEmployees = mappedEmployees.filter((line: any) => line.id != employeeID);
      setState({ employees: mappedEmployees });
    }, err => {
      throw err;
    })
  }

  @Action(UpdateEmployeeAction)
  public updateEmployeeAction(
    { setState, getState }: StateContext<EmployeeStateModel>,
    { payload }: UpdateEmployeeAction) {
    this.employeeSerive.updateEmployee(payload).subscribe((response) => {
      let mappedEmployees = [...getState().employees];
      const updated = response.id;
      const foundIndex = mappedEmployees.findIndex(x => x.id == updated);
      mappedEmployees[foundIndex] = response;
      setState({ employees: mappedEmployees });
    }, err => {
      throw err;
    })
  }

  // @Action(OpenSnackBarAction)
  // public openSnackBarAction(ctx: StateContext<EmployeeStateModel>,
  //   { message, panelClass }: OpenSnackBarAction) {
  // }
}
