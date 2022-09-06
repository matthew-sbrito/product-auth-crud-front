import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../components/confirmation-dialog/confirmation-dialog.component";
import {ConfirmableData, ConfirmableResponse, ConfirmableService} from "../common/confirmable/confirmable.model";
import {lastValueFrom, map} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConfirmationDialogService implements ConfirmableService {

  constructor(
    private dialog: MatDialog
  ) { }

  async showConfirm(parameters?: ConfirmableData): Promise<ConfirmableResponse> {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, ConfirmableData, ConfirmableResponse>(
      ConfirmationDialogComponent, {
        data: parameters
      })

    const observableResponse = dialogRef.afterClosed().pipe(
      map( response => response ?? { isConfirmed: false })
    );

    return await lastValueFrom<ConfirmableResponse>(observableResponse);
  }

  defaultConfirm(): ConfirmableData {
    return {
      title: 'Confirmação!',
      message: 'Deseja realizar esta ação?',
      confirmButtonText: 'SIM',
      deniedButtonText: 'NÃO'
    };
  }


}
