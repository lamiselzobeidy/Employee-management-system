import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBModalService } from 'ng-uikit-pro-standard';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { EmployeeState } from './store/employees/employees.state';
import { DepartmentsPageComponent } from './components/departments-page/departments-page.component';
import { EmployeesPageComponent } from './components/employees-page/employees-page.component';
import { ListingScreenComponent } from './components/shared/listing-screen/listing-screen.component';
import { ActionDialogComponent } from './components/shared/action-dialog/action-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SystemMissingTranslationHandler } from './missingTranslationHandler';
import { DepartmentState } from './store/departments/departments.state';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ListingScreenComponent,
    DepartmentsPageComponent,
    EmployeesPageComponent,
    ActionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: SystemMissingTranslationHandler },
      isolate: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([
      EmployeeState,
      DepartmentState
    ]),
  ],
  providers: [
    MDBModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
