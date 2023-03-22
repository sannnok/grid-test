import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNS } from 'src/assets/columns';
import { APIService } from '../../api.service';
import { DeviceEvent } from '../../interfaces/event.interface';
import { v1 as uuid } from 'uuid';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent implements OnInit {
  public tableData?: {[key: string]: string}[];
  public dataSource: MatTableDataSource<DeviceEvent> = new MatTableDataSource();
  public columns = COLUMNS;
  public displayedColumns = this.columns.map(column => column.property).concat('actions');
  public formGroup: FormGroup = new FormGroup([]);
  public pageSize = 10;
  public pageSizeOptions = [10, 25, 50, 100];
  public totalRecords = 0;

  constructor(private apiService: APIService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.apiService.getTableData().subscribe(data => {
      this.dataSource.data = data.result;
      this.totalRecords = data.result.length;

      this.formGroup = this.formBuilder.group({});
      this.dataSource.data.forEach(event => {
        this.columns.forEach(column => {
          this.formGroup.addControl(column.property + '_' + event.eventId, this.formBuilder.control((event as any)[column.property]));
        });
      });
    });
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  }

  public onAdd(): void {
    const newEventId = uuid();
    this.columns.forEach(column => {
      this.formGroup.addControl(column.property + '_' + newEventId, this.formBuilder.control((event as any)[column.property]));
    });
    this.dataSource.data = [...this.dataSource.data, { eventId: newEventId } as any]
  }

  public onDelete(row: DeviceEvent): void {
    this.apiService.deleteTableData(row.eventId).subscribe(() => this.updateDataSource());
    // Remove model controls
  }

  private updateDataSource() {
    this.apiService.getTableData().subscribe(data => {
      this.dataSource.data = data.result;
      this.totalRecords = data.result.length;
    });
  }
}
