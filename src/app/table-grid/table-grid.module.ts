import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridTableComponent } from './components/grid-table/grid-table.component';
import { EmptyPipe } from './pipes/empty.pipe';



@NgModule({
  declarations: [
    GridTableComponent,
    EmptyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GridTableComponent
  ]
})
export class TableGridModule { }
