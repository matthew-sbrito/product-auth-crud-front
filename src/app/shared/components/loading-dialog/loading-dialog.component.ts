import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-loading',
  templateUrl: './dialog-loading.component.html',
  styleUrls: ['./dialog-loading.component.css']
})
export class DialogLoadingComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<DialogLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogLoadingParams,
  ) { }

  ngOnInit(): void {
  }

  get message(): string {
    return this.data.message;
  }
}

export interface DialogLoadingParams {
  message: string;
}
