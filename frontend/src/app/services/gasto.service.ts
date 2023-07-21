import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gasto } from '../models/gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  selectedGasto: Gasto;
  gastos: Gasto[] = [];
  readonly URL_API = 'http://localhost:3000/api/gastos';
  constructor(private http: HttpClient) {
    this.selectedGasto = new Gasto();
  }
  getGastos() {
    return this.http.get('http://localhost:3000/api/gastos');
  }

  postGasto(Gasto: Gasto) {
    return this.http.post(this.URL_API, Gasto);
  }
  putGasto(gasto: Gasto) {
    return this.http.put(this.URL_API + '/$(gasto._id)', gasto);
  }
  deleteGasto(gasto: Gasto) {
    return this.http.delete(this.URL_API + '/$(gasto._id)');
  }
}
