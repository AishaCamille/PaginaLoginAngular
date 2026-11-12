import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario{
  name: string;
  email: string;
  password: string;
}

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-auth',
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class Auth implements OnInit {
  form!: FormGroup;
  isLoginMode: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private router: Router
  ){}
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(){
    this.form= this.fb.group({
      name:[''],
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required, Validators.minLength(6)]]
    })
  }
  toggleMode():void{
    this.isLoginMode = !this.isLoginMode
  }
  getUsuarios(): Usuario[]{
    const dados = localStorage.getItem('usuarios');//"cosntante? pega dados" que dados? "do local storage"
    return dados? JSON.parse(dados) : [];
  }

  salvarUsuarios(lista: Usuario[]):void{
    localStorage.setItem('usuario', JSON.stringify(lista));
  }
  onSubmit(){
    console.log('form submit enviado');
    if(this.form.invalid)return;
    console.log('form invalido', this.form.errors);//mostra os erros no console se submit deu arrado
    
    const {name, email, password} =this.form.value;//valor do formulario
    const usuarios = this.getUsuarios();
    
    if(this.isLoginMode){
      const usuario = usuarios.find(u => u.email && u.password == password);
      if(usuario){
        console.log('login bem sucedido!', usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.router
      }
    }
  }
}
//required significa que o campo é obrigatorio
//Validators.email para aceitar apenas emails
//Validators.minLength(6) validar a senha que tenha no minimo 6 caracters