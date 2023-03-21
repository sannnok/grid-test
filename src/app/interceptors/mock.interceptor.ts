import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { delay, Observable, of, switchMap } from 'rxjs';
import { EVENTS } from '../../assets/data'

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body } = request;

    switch (true) {
      case url.endsWith('/events') && method === 'GET':
        return this.getEvents();
      // case url.endsWith('/events') && method === 'POST':
      //   return postEvent();
      // case url.endsWith('/events') && method === 'PUT':
      //   return editEvent();
      // case url.endsWith('/events') && method === 'DELETE':
      //   return deleteEvent();
      default:
        return next.handle(request);
    }    
  }

  public getEvents() {
    return this.ok(EVENTS);
  }

  private ok(body?: any) {
    return of(new HttpResponse({ status: 200, body }))
      .pipe(delay(500));
  }
}
