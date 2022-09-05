import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {LoadingService} from "../../shared/services/loading.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  modeRegister: boolean = false;

  showPassword: boolean = false;
  passwordType: string = "password";

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private toast: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.min(4)]],
      username: ['', [Validators.required, Validators.min(4)]],
      password: ['', [Validators.required, Validators.min(4)]],
    });
  }

  ngOnInit(): void {
  }

  getTitleForm(): string {
    return this.modeRegister ? 'Registro' : 'Login';
  }

  getLabelButtonChange(): string {
    return this.modeRegister ? 'Já possui conta? Logar' : 'Não possui conta? Cadastrar';
  }

  getLabelButtonSubmit(): string {
    return this.modeRegister ? 'Cadastrar' : 'Entrar';
  }

  changeMode(): void {
    this.modeRegister = !this.modeRegister;

    const validators = this.modeRegister ? [Validators.required, Validators.min(4)] : [];

    this.form.controls["name"].setValidators(validators);
  }

  hasError(name: string, validator: string) {
    return this.form.controls[name].errors?.[validator]
  }

  changeShowPassword() {
    this.showPassword = !this.showPassword
    this.passwordType = this.showPassword ? "text" : "password";
  }

  getIconPassword() {
    return this.showPassword ? "visibility_off" : "remove_red_eye";
  }

  submitForm() {
    if(!this.form.valid) {
     return this.toast.error("Preencha os campos!", "Oppss!")
    }

    return this.modeRegister
      ? this.submitRegister()
      : this.submitLogin();
  }

  submitRegister() {
    const loadingRef = this.loadingService.show();

    this.authenticationService.register(this.form.value).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {}
    }).add(() => loadingRef.close());
  }

  submitLogin() {
    const loadingRef = this.loadingService.show();

    const { name, ...rest } = this.form.value;

    this.authenticationService.login(rest).subscribe({
      next: (value) => this.toast.success(`Bem vindo ${value.user.name}!`, "Login realizado!"),
      error: () => this.toast.error("Credências inválidas!", "Oppss!"),
    }).add(() => loadingRef.close());
  }
}
