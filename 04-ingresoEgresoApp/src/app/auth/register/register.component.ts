import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  crearUsuario() {

    if (this.formGroup.invalid) {
      return;
    }

    //desestructuramos lo que viene del formulario
    const { nombre, correo, password } = this.formGroup.value

    //llamamos el servicio  y le pasamos la info del formulario.
    //crearUsuario devuelve un promise 
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        this.router.navigate(['/'])
      })
      .catch(err => console.error(err));

  }

}
