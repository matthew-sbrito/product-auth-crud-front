import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingDialogComponent, LoadingDialogParams} from "../components/loading-dialog/loading-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  show(message: string = 'Carregando...'): MatDialogRef<LoadingDialogComponent> {
    return this.dialog.open<LoadingDialogComponent, LoadingDialogParams>(LoadingDialogComponent, {
      data: {message},
      width: '400px',
      height: '400px',
      disableClose: true
    });
  }
}
