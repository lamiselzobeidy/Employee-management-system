import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDialogComponent } from './action-dialog.component';
import {ModalModule} from "ng2-bootstrap";

describe('ActionDialogComponent', () => {
  let component: ActionDialogComponent;
  let fixture: ComponentFixture<ActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionDialogComponent ],
      imports:[ModalModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
