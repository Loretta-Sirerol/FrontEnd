import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent {

  isLogged = false;

  constructor(private router: Router, private tokeService: TokenService) { }

  ngOnInit(): void {
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const icons = document.getElementsByClassName('social-media')[0];
    toggleButton.addEventListener('click', () => {
      icons.classList.toggle('active')
    });

    if(this.tokeService.getToken())
    {
      this.isLogged = true;
    }
    else
    {
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

}
