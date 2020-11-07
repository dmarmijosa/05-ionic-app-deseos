import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';
import { AgregarPage } from '../agregar/agregar.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  

  constructor(public deseosServices:DeseosService,
              private router:Router,
              private alertCtrl: AlertController) {
    


  }
  async agregarLista(){
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs:[
        {
          name:'titulo',
          type:'text',
          placeholder:'Nombre de la lista'

        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            console.log('cancelado');
          }

        },
        {
          text:'Crear',
          handler: (data)=>{
            console.log(data);
            //validacion
            if(data.titulo.length===0){
              return;
            }
            const listaId = this.deseosServices.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
            //crear la lista 
          }

        }

      ]
    });

    alert.present();
    
    //this.router.navigateByUrl('/tabs/tab1/agregar');
  }

}
