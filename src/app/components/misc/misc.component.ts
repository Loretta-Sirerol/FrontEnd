import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent {

  icons: Element = null as unknown as HTMLElement;

  isLogged: Boolean = false;

  constructor(private router: Router, private tokeService: TokenService) { }

  ngOnInit(): void {

    this.icons = document.getElementsByClassName('social-media')[0];

    if (this.tokeService.getToken()) {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }

  }


  login(): void {
    this.router.navigate(["auth/login"])
  }

  logout(): void {
    this.tokeService.logOut();
    window.location.reload();
  }
  
  magic(): void {
      this.icons.classList.toggle('active');
  }

}
