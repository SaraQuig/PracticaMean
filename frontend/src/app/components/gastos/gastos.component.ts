import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm
import { Gasto } from '../../models/gasto'; // Import Gasto class from models
import { GastoService } from '../../services/gasto.service'; // Import GastoService

declare const M: any;

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
  constructor(private gastoService: GastoService) { } // Inject GastoService

  ngOnInit(): void {
    this.getGastos();
  }


  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.gastoService.selectedGasto = new Gasto();
    }
  }

  addGasto(form: NgForm) {
    this.gastoService.postGasto(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({ html: 'Gasto Guardado' });
      });
  }

  get selectedGasto(): Gasto {
    return this.gastoService.selectedGasto;
  }

  get gastos(): Gasto[] {
    return this.gastoService.gastos;
  }
  getGastos() {
    this.gastoService.getGastos()
      .subscribe(res => {
        this.gastoService.gastos = res as Gasto[];
        console.log(res);
      })
  }
  editGasto(gasto: Gasto) {
    this.gastoService.putGasto(gasto).subscribe(
      (res: any) => {
        console.log(res);
        M.toast({ html: 'Gasto Actualizado' });

        // Refresh the gastos list after updating
        this.getGastos();
      },
      error => {
        console.error('Error al editar gasto:', error);
      }
    );
  }

  deleteGasto(gasto: Gasto) {
    if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      this.gastoService.deleteGasto(gasto).subscribe(
        (res: any) => {
          console.log(`Gasto eliminado`);
          this.getGastos();
          M.toast({ html: 'Gasto Eliminado' });
        },
        error => {
          console.error(`Error al eliminar gasto`, error);
        }
      );
    }
  }

}
