export class Gasto {
    constructor(tipo='',ruc='',empresa='',monto=0){
        this.tipo=tipo;
        this.ruc=ruc;
        this.empresa=empresa;
        this.monto=monto;
    }
    tipo: string;
    ruc: string;
    empresa: string;
    monto: number;
}
