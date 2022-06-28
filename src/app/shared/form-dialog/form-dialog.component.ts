import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/views/home/home.component';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  element!: PeriodicElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<FormDialogComponent>,

  ) { }


  ngOnInit(): void {
    if (this.data.position != null) {
      this.isChange = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.onCancel()
  }
}
