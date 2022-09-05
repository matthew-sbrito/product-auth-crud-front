import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogLoadingComponent, DialogLoadingParams} from "../components/dialog-loading/dialog-loading.component";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  show(message: string = 'Carregando...'): MatDialogRef<DialogLoadingComponent> {
    return this.dialog.open<DialogLoadingComponent, DialogLoadingParams>(DialogLoadingComponent, {
      data: {message},
      width: '50vw',
      height: '25vh',
      disableClose: true
    });
  }
}
