import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';

/** TODO:
 * 1. Implement paginating / Virtual scroll
 * 2. Implement Reactive Forms - Use of FormGroup, generating id for each cell
 * 3. Implement Grid System - flexibility, reordering, drag&drop, etc.
 *  */ 

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent implements OnInit {
  public tableData?: {[key: string]: string}[];

  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.apiService.getTableData().subscribe(data => {
      this.tableData = data.result;
    });
  }

  public onEdit(row: any): void {
  }

  public onAdd(): void {
  }

  public onDelete(row: any): void {
  }

}