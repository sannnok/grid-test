import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeviceEvent, TableData } from './interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = 'api/events';

  constructor(private http: HttpClient) { }

  getTableData(): Observable<TableData> {
    return this.http.get<TableData>(this.apiUrl);
  }

  addTableData(row: DeviceEvent): Observable<TableData> {
    return this.http.post<TableData>(this.apiUrl, row);
  }

  updateTableData(row: DeviceEvent): Observable<Object> {
    const url = `${this.apiUrl}/${row.eventId}`;
    return this.http.put(url, row);
  }

  deleteTableData(id: number): Observable<Object> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
