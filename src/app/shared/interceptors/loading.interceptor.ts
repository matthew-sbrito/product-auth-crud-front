import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable, OperatorFunction, switchMap} from 'rxjs';
import {LoadingService} from "../services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private static EXCLUSIVE_MESSAGE = new Map([
    ["login", "Logando..."]
  ])

  constructor(private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.loadingService
      .show(LoadingInterceptor.getMessageByMethod(request))
      .pipe(this.loadingMap(request, next));
  }

  private loadingMap(request: HttpRequest<unknown>, next: HttpHandler): OperatorFunction<unknown, HttpEvent<unknown>> {
    return switchMap(() =>
      next
        .handle(request)
        .pipe(finalize(() => this.loadingService.hide()))
    )
  }

  private static getMessageByMethod(request: HttpRequest<unknown>): string {
    for (let [endpoint, message] of LoadingInterceptor.EXCLUSIVE_MESSAGE) {
      if (request.url.includes(endpoint)) return message;
    }

    switch (request.method.toLowerCase()) {
      case 'post':
        return 'Salvando...'
      case 'put':
        return 'Atualizando...'
      case 'delete':
        return 'Apagando...'
      default:
        return 'Carregando...'
    }
  }
}
