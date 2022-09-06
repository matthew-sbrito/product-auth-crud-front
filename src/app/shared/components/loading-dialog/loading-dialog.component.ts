import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<LoadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: LoadingDialogParams,
  ) { }

  ngOnInit(): void {
  }

  get message(): string {
    return this.data.message;
  }
}

export interface LoadingDialogParams {
  message: string;
}
