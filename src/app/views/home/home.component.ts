import {Component, OnInit, ViewChild} from '@angular/core';
import {ElementDialogComponent} from "../../shared/element-dialog/element-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";

export interface ListProduct {
  album: string;
  position: number;
  year: number;
  band: string;
}

const ELEMENT_DATA: ListProduct[] = [
  {position: 1, album: 'The Wall', year: 1979, band: 'Pink Floyd'},
  {position: 2, album: 'In Utero', year: 1993, band: 'Nirvana'},
  {position: 3, album: 'Paranoid', year: 1970, band: 'Black Sabbath'},
  {position: 4, album: 'A Night At The Opera', year: 1975, band: 'Queen'},
  {position: 5, album: 'Rumours', year: 1977, band: 'Fleetwood Mac'},
  {position: 6, album: 'Ok Computer', year: 1997, band: 'Radiohead'},
  {position: 7, album: 'Countdown To Extinction', year: 1992, band: 'Megadeth'},
  {position: 8, album: 'Back In Black', year: 1980, band: 'AC DC'},
  {position: 9, album: 'Aqualung', year: 1971, band: 'Jethro Tull'},
  {position: 10, album: 'Appetite For Destruction', year: 1987, band: 'Guns N Roses'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'album', 'year', 'band', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(element: ListProduct | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      //width: '250px',
      data: element === null ? {
        position: null,
        album: '',
        year: null,
        band: '',
      } : {
        position: element.position,
        album: element.album,
        year: element.year,
        band: element.band,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        if (this.dataSource.map(p => p.position).includes(result.position)){
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  deleteElement(position: number): void {
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }

  editElement(element: ListProduct): void {
    this.openDialog(element);
  }
}
