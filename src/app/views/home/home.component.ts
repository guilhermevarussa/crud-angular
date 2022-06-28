import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PeriodicElement } from 'src/app/models/model';
import { ElementsService } from 'src/app/services/elements.service';
import { FormDialogComponent } from 'src/app/shared/form-dialog/form-dialog.component';


// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ElementsService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource!: PeriodicElement[];


  constructor(
    public dialog: MatDialog,
    public elementsService: ElementsService
  ) {
    this.elementsService.getElements().subscribe((data: PeriodicElement[]) => {
      console.log(data);
      this.dataSource = data;
    })
  }

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void {

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name: "",
        weight: null,
        Symbol: ""
      } : {
        id: element.id,
        position: element.position,
        name: element.name,
        weight: element.weight,
        Symbol: element.symbol
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result)
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.elementsService.editElement(result).subscribe((data: PeriodicElement) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
          })

        } else {
          this.elementsService.creatElements(result).subscribe((data: PeriodicElement) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });

        }

      }


    });

  }

  deleteElement(position: number) {

    this.elementsService.deleteElement(position).subscribe(() => {
      this.dataSource = this.dataSource.filter(el => el.position !== position)
    });



  }

  editElement(element: PeriodicElement) {
    this.openDialog(element);

  }


}









