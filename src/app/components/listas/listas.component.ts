import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosServices:DeseosService,
              private router:Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}
  listaSelecionada(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
      
    }else{
      
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }

  }
  borrarLista(lista:Lista){
    this.deseosServices.borrarLista(lista);
    
  }
  async editarLista(lista : Lista){
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs:[
        {
          name:'titulo',
          type:'text',
          value: lista.titulo,
          
          placeholder:'Nombre de la lista'

        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            console.log('cancelado');
            this.lista.closeSlidingItems();
          }

        },
        {
          text:'Actualizar',
          handler: (data)=>{
            console.log(data);
            //validacion
            if(data.titulo.length===0){
              return;
            }

            lista.titulo = data.titulo;
            this.deseosServices.guardarStorage();
            this.lista.closeSlidingItems();
            //crear la lista 
          }

        }

      ]
    });

    alert.present();

  }

}
