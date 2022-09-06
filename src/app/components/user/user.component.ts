import {Component, OnInit} from '@angular/core';
import {ApplicationUser} from "../../shared/models/authentication.model";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {combineLatest} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formGroup!: FormGroup;

  showPassword: boolean = false;
  passwordType: string = "password";

  showPasswordNew: boolean = false;
  passwordTypeNew: string = "password";

  changePassword: boolean = false;

  user!: ApplicationUser;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.user = ApplicationUser.fromApi(this.authenticationService.getLoggedUser()!.user);

    this.formGroup = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4)]],
      username: [this.user.username, [Validators.required, Validators.minLength(4)]],
      oldPassword: ['', []],
      newPassword: ['', []],
    });
  }

  changeShowPassword() {
    this.showPassword = !this.showPassword
    this.passwordType = this.showPassword ? "text" : "password";
  }

  getIconPassword() {
    return this.showPassword ? "visibility_off" : "remove_red_eye";
  }

  changeShowPasswordNew() {
    this.showPasswordNew = !this.showPasswordNew
    this.passwordTypeNew = this.showPasswordNew ? "text" : "password";
  }

  getIconPasswordNew() {
    return this.showPasswordNew ? "visibility_off" : "remove_red_eye";
  }

  save() {
    const user = { id: this.user.id, ...this.formGroup.value };
    const request = [this.authenticationService.update(user)]

    if (this.changePassword) {
      request.push(this.authenticationService.changePassword(user))
    }

    combineLatest(request)
      .subscribe({
        next: ([response, responsePassword]) => {
          this.toast.success("Seu perfil foi atualizado!", "Salvo!")
        },
        error: (err) => {
          this.toast.error(err.error.message, "Oppss!")
        }
      })
  }

  onChange(event: any) {
    this.formGroup.controls['oldPassword'].setErrors(null);
    this.formGroup.controls['newPassword'].setErrors(null);

    if (this.changePassword) {
      const validators = [Validators.required, Validators.minLength(4)];

      this.formGroup.controls['oldPassword'].setValidators(validators);
      this.formGroup.controls['newPassword'].setValidators(validators);
    } else {

      this.formGroup.controls['oldPassword'].clearAsyncValidators();
      this.formGroup.controls['newPassword'].clearAsyncValidators();
    }
  }
}
