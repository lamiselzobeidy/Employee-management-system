import { MDBModalRef } from 'ng-uikit-pro-standard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { Employee } from 'src/app/models/employee.model';
import { Department } from 'src/app/models/department.model';
@Component({
  selector: 'app-listing-screen',
  templateUrl: './listing-screen.component.html',
  styleUrls: ['./listing-screen.component.css']
})
export class ListingScreenComponent implements OnInit {
  @Input() mappingData: any;
  @Input() title: string;
  @Output() deletedMappingLineId: EventEmitter<number> = new EventEmitter();
  @Output() editMappingLineId: EventEmitter<Employee | Department> = new EventEmitter();
  @Output() addMappingLineId: EventEmitter<Employee | Department> = new EventEmitter();
  closeResult: string;
  columnNames: string[];
  modalRef: MDBModalRef | null = null;
  constructor(
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.columnNames = Object.keys(this.mappingData[0]);
  }
  openActionDialog(row?: Employee) {
    const modalRef = this.modalService.open(ActionDialogComponent);
    if (row) {
      modalRef.componentInstance.data = { row, title: `Edit ${this.title}`, mode:'edit' };
      modalRef.componentInstance.passEntry.subscribe((dialogOutput) => {
        this.editMappingLineId.emit(dialogOutput);
        this.modalService.dismissAll();
      });
    } else {
      modalRef.componentInstance.data = { columns: this.columnNames, title: `Create ${this.title}` , mode:'create'};
      modalRef.componentInstance.passEntry.subscribe((dialogOutput) => {
        this.addMappingLineId.emit(dialogOutput);
        this.modalService.dismissAll();
      });
    }
  }

  deleteMappingLine(rowId: number) {
    // const modalRef = this.modalService.open(ActionDialogComponent);
    this.deletedMappingLineId.emit(rowId);
  }
}
