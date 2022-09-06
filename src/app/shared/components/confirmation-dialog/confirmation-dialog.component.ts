import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmableData, ConfirmableResponse} from "../../common/confirmable/confirmable.model";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent, ConfirmableResponse>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmableData
  ) { }

  ngOnInit(): void {
  }

  denied() {
    this.dialogRef.close({
      isConfirmed: false
    })
  }

  confirm() {
    this.dialogRef.close({
      isConfirmed: true
    })
  }

}
