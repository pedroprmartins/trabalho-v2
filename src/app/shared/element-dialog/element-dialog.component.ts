import {Component, Inject, OnInit} from '@angular/core';
import {PeriodicElement} from "../../views/home/home.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit{
  element!: PeriodicElement;
  isChange!: boolean;
  position: any;
  album: any;
  year: any;
  band: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ElementDialogComponent,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit() {
    if(this.data.position != null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
