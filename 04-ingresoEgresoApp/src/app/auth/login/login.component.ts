import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginUsuario() {
    if (this.formGroup.invalid) {
      return;
    }

    const { correo, password } = this.formGroup.value;
    this.authService.loginUsuario(correo, password)
      .then(credenciales => {
        console.log(credenciales);
        this.router.navigate(['/'])
      })
      .catch(err => console.error(err));
  }

}
