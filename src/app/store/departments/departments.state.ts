import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetDepartmentsAction, DeleteDepartmentAction, PostDepartmentAction, UpdateDepartmentAction } from "./departments.action";
import { DepartmentsService } from "src/app/services/departments/departments.service";
import { Department } from "src/app/models/department.model";

interface DepartmentStateModel {
  departments: Department[];
}

@State<DepartmentStateModel>({
  name: 'DepartmentState'
})
@Injectable()
export class DepartmentState {
  constructor(
    private departmentSerive: DepartmentsService,
  ) { }

  @Selector()
  public static getDepartments(state: DepartmentStateModel) {
    return state.departments;
  }

  @Action(GetDepartmentsAction)
  public getDepartmentSettings(
    { patchState }: StateContext<DepartmentStateModel>,
    { }: GetDepartmentsAction) {
    this.departmentSerive.getDepartments().subscribe(response => {
      patchState({ departments: response })
    }, err => {
      throw err;
    })
  }

  @Action(PostDepartmentAction)
  public postDepartmentAction(
    { setState, getState }: StateContext<DepartmentStateModel>,
    { payload }: PostDepartmentAction) {
    const mappedDepartments = getState().departments;
    this.departmentSerive.createDepartment(payload).subscribe((response) => {
      setState({ departments: [...mappedDepartments, response] });
    }, err => {
      throw err
    })
  }

  @Action(DeleteDepartmentAction)
  public deleteDepartmentAction(
    { getState, setState }: StateContext<DepartmentStateModel>,
    { departmentID }: DeleteDepartmentAction) {
    let mappedDepartments = getState().departments;
    this.departmentSerive.deleteDepartment(departmentID).subscribe(() => {
      mappedDepartments = mappedDepartments.filter((line: any) => line.id != departmentID);
      setState({ departments: mappedDepartments });
    }, err => {
      throw err;
    })
  }

  @Action(UpdateDepartmentAction)
  public updateDepartmentAction(
    { setState, getState }: StateContext<DepartmentStateModel>,
    { payload }: UpdateDepartmentAction) {
    this.departmentSerive.updateDepartment(payload).subscribe((response) => {
      let mappedDepartments = [...getState().departments];
      const updated = response.id;
      const foundIndex = mappedDepartments.findIndex(x => x.id == updated);
      mappedDepartments[foundIndex] = response;
      setState({ departments: mappedDepartments });
    }, err => {
      throw err;
    })
  }
}
