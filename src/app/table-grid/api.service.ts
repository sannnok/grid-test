import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableData } from './interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = 'api/events';

  constructor(private http: HttpClient) { }

  getTableData(): Observable<TableData> {
    return this.http.get<TableData>(this.apiUrl);
  }

  addTableData(row: {[key: string]: string}): Observable<TableData> {
    return this.http.post<TableData>(this.apiUrl, row);
  }

  updateTableData(row: {[key: string]: string}): Observable<void> {
    const url = `${this.apiUrl}/${row['id']}`;
    return this.http.put(url, row).pipe(map(() => undefined));
  }

  deleteTableData(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(map(() => undefined));
  }
}