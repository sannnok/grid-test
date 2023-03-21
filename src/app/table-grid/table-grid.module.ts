import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridTableComponent } from './components/grid-table/grid-table.component';
import { EmptyPipe } from './pipes/empty.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'; 


@NgModule({
  declarations: [
    GridTableComponent,
    EmptyPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  exports: [
    GridTableComponent
  ]
})
export class TableGridModule { }
