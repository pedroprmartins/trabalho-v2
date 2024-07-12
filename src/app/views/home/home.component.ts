import {Component, OnInit, ViewChild} from '@angular/core';
import {AlbumDialogComponent} from "../../shared/album-dialog/album-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTable} from "@angular/material/table";
import {ListAlbums} from "../../models/ListAlbums";
import {ListAlbumsService} from "../../services/ListAlbums.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ListAlbumsService]
})
export class HomeComponent implements OnInit{
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'album', 'year', 'band', 'action'];
  dataSource! : ListAlbums[];

  constructor(
    public dialog: MatDialog,
    public listAlbumsService: ListAlbumsService
  ) {
    this.listAlbumsService.getAlbums().subscribe((data: ListAlbums[]) => {
      console.log(data);
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}

  //Falta acressentar o campo para imagem
  openDialog(album: ListAlbums | null): void {
    const dialogRef = this.dialog.open(AlbumDialogComponent, {
      //width: '250px',
      data: album === null ? {
        position: null,
        album: '',
        year: null,
        band: '',
      } : {
        id: album.id,
        position: album.position,
        album: album.album,
        year: album.year,
        band: album.band,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined){
        console.log(result);
        if (this.dataSource && this.dataSource.map(p => p.id).includes(result.id)){
          this.listAlbumsService.editAlbum(result).subscribe((data: ListAlbums) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            if (index !== -1) {
              this.dataSource[index] = result;
              this.table.renderRows();
            }
          });
        } else {
          this.listAlbumsService.createAlbum(result).subscribe((data: ListAlbums) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        /*if (this.dataSource.map(p => p.id).includes(result.id)){
          this.listAlbumsService.editAlbum(result).subscribe((data: ListAlbums) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = result;
            this.table.renderRows();
          });
        } else {
          this.listAlbumsService.createAlbum(result).subscribe((data: ListAlbums) => {
            this.dataSource.push(result);
            this.table.renderRows();
          });*/
        }
      }
    });
  }
  editAlbum(album: ListAlbums): void {
    this.openDialog(album);
  }
  deleteAlbum(position: number): void {
    this.listAlbumsService.deleteAlbum(position).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== position);
    });
  }
}
