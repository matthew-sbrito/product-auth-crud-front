import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingDialogComponent, LoadingDialogParams} from "../components/loading-dialog/loading-dialog.component";
import {firstValueFrom, Observable, switchMap, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  static ID = "LOADING_DIALOG";

  constructor(private dialog: MatDialog) { }

  show(message: string): Observable<void> {
    const dialogRef = this.getDialog();

    if(dialogRef === undefined) return this.open(message);

    dialogRef!.close();

    return dialogRef!
      .afterClosed()
      .pipe(switchMap(() => this.open(message)));
  }

  hide(): void {
    this.getDialog()?.close()
  }

  private open(message: string): Observable<void> {
    return this.dialog.open<LoadingDialogComponent, LoadingDialogParams>(LoadingDialogComponent, {
      id: LoadingService.ID,
      data: {message},
      width: '400px',
      height: '400px',
      disableClose: true
    }).afterOpened()
  }

  private getDialog(): MatDialogRef<LoadingDialogComponent> | undefined{
    return this.dialog.getDialogById(LoadingService.ID);
  }
}
