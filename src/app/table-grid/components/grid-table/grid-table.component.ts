import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from '../../api.service';
import { DeviceEvent } from '../../interfaces/event.interface';


@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent implements OnInit {
  public tableData?: {[key: string]: string}[];
  public dataSource: MatTableDataSource<DeviceEvent> = new MatTableDataSource();
  public columns = [
    { property: 'healthIndex', label: 'Health Index' },
    { property: 'endDate', label: 'End Date' },
    { property: 'minValueDateTime', label: 'Min Value Date Time' },
    { property: 'type', label: 'Type' },
    { property: 'cowId', label: 'Cow ID' },
    { property: 'animalId', label: 'Animal ID' },
    { property: 'eventId', label: 'Event ID' },
    { property: 'deletable', label: 'Deletable' },
    { property: 'lactationNumber', label: 'Lactation Number' },
    { property: 'daysInLactation', label: 'Days in Lactation' },
    { property: 'ageInDays', label: 'Age in Days' },
    { property: 'startDateTime', label: 'Start Date Time' },
    { property: 'reportingDateTime', label: 'Reporting Date Time' },
    { property: 'alertType', label: 'Alert Type' },
    { property: 'duration', label: 'Duration' },
    { property: 'originalStartDateTime', label: 'Original Start Date Time' },
    { property: 'endDateTime', label: 'End Date Time' },
    { property: 'daysInPregnancy', label: 'Days in Pregnancy' },
    { property: 'newGroupId', label: 'New Group ID' },
    { property: 'newGroupName', label: 'New Group Name' },
    { property: 'currentGroupId', label: 'Current Group ID' },
    { property: 'currentGroupName', label: 'Current Group Name' },
    { property: 'destinationGroup', label: 'Destination Group' },
    { property: 'destinationGroupName', label: 'Destination Group Name' },
    { property: 'calvingEase', label: 'Calving Ease' },
    { property: 'oldLactationNumber', label: 'Old Lactation Number' },
    { property: 'newborns', label: 'Newborns' },
    { property: 'birthDateCalculated', label: 'Birth Date Calculated' },
    { property: 'sire', label: 'Sire' },
    { property: 'breedingNumber', label: 'Breeding Number' },
    { property: 'isOutOfBreedingWindow', label: 'Out of Breeding Window' },
    { property: 'interval', label: 'Interval' },
  ];
  public displayedColumns = this.columns.map(column => column.property).concat('actions');

  public rowFormGroup: FormGroup = new FormGroup([]);

  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100];
  totalRecords = 0;

  constructor(private apiService: APIService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.apiService.getTableData().subscribe(data => {
      this.dataSource.data = data.result;
      this.totalRecords = data.result.length;

      this.rowFormGroup = this.formBuilder.group({});
      this.dataSource.data.forEach(event => {
        this.columns.forEach(column => {
          this.rowFormGroup.addControl(column.property + '_' + event.eventId, this.formBuilder.control((event as any)[column.property]));
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
  }

  public onDelete(row: DeviceEvent): void {
    this.apiService.deleteTableData(row.eventId);
  }
}
