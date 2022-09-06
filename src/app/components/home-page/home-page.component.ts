import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Confirmable} from "../../shared/common/confirmable/confimable.decorator";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  get fullName(): string {
    return this.authenticationService.getLoggedUser()!.user.name;
  }

  ngOnInit(): void {
  }

  @Confirmable({
    title: "Sair",
    message: "Deseja realmente sair?"
  })
  logout() {
    this.authenticationService.removeLoggedUser();

    this.router.navigate(['login']).then(() => {
      this.toast.success("Até a próxima!", "Logout")
    })
  }
}
