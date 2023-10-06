import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EmployeesPageComponent } from './components/employees-page/employees-page.component';
import { DepartmentsPageComponent } from './components/departments-page/departments-page.component';

const routes: Routes = [
  { path: 'listing/employees', component: EmployeesPageComponent },
  { path: 'listing/departments', component: DepartmentsPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
