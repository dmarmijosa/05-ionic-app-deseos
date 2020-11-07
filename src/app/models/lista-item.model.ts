export class ListaItem{
    des:String;
    completado:boolean;

    constructor(desc:string){
        this.des = desc;
        this.completado=false;
    }
}