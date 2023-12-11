import { Component, Inject, OnInit } from '@angular/core';
import { ListAlbums } from "../../models/ListAlbums";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-album-dialog',
  templateUrl: './album-dialog.component.html',
  styleUrls: ['./album-dialog.component.scss']
})
export class AlbumDialogComponent implements OnInit {
  isChange!: boolean;
  position: any;
  album: any;
  year: any;
  band: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ListAlbums,
    public dialogRef: MatDialogRef<AlbumDialogComponent>,
  ) {}

  ngOnInit() {
    if (this.data && this.data.position !== null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
