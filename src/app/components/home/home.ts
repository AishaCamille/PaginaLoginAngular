import { Component } from '@angular/core';
import { Auth } from '../auth/auth';

@Component({
  imports: [Auth],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  nome: string= '';

  constructor(){
    //pegar tudo no localstorage
    const dadosSalvos = localStorage.getItem("usuarioLogado");

    if(dadosSalvos){
      const usuarioLogado = JSON.parse(dadosSalvos);
      this.nome = usuarioLogado.name;
    }
  }
}

