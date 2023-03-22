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
    console.log('it should execute one time')
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
      case url.includes('/events') && method === 'DELETE':
        return this.deleteEvent(+url.slice(url.lastIndexOf('/') + 1));
      default:
        return next.handle(request);
    }    
  }

  public getEvents() {
    return this.ok(EVENTS);
  }
  
  public deleteEvent(eventId: number) {
    EVENTS.result = EVENTS.result.filter(event => event.eventId !== eventId);
    return this.ok();
  }

  private ok(body?: any) {
    return of(new HttpResponse({ status: 200, body }))
      .pipe(delay(500));
  }
}
