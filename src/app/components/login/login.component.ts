import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user.model';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLogged = false;
  isLogInFailed = false;
  loginUser!: LoginUser;
  usrName!: String;
  password!: String;
  roles: Array<String> = [];
  errMsg: String = "";

  constructor(private tokenService: TokenService, 
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if(this.tokenService.getToken())
    {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = '#000000';

    const particleNumber = 64;
    let particlesArray: Array<Particle> = [];

    let threshold = canvas.width * canvas.height * 0.14285714285;


    window.addEventListener('resize', function () {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      init();
    })

    class Particle {
      x: number;
      y: number;
      dirX: number;
      dirY: number;
      size: number;
      color: String;
      constructor(x: number, y: number, dirX: number, dirY: number, size: number, color: String) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
      }

      draw() {
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
         */
        ctx.beginPath();
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
         */
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fill();
      }

      update() {

        this.dirX *= (this.x > canvas.width || this.x < 0) ? -1 : 1;

        this.dirY *= (this.y > canvas.height || this.y < 0) ? -1 : 1;

        /**
         * Update particle position
         */
        this.x += this.dirX;
        this.y += this.dirY;

        this.draw()
      }

    }

    function init() {
      particlesArray.length = 0;
      for (let count = 0; count < particleNumber; count++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 5) - 2.5;
        let dirY = (Math.random() * 5) - 2.5;
        let color = '#000000';
        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
      }
    }

    function connect() {
      let opacity = 1;
      let distance;
      for (let ctr = 0; ctr < particleNumber; ctr++) {
        for (let ctr1 = 0; ctr1 < particleNumber; ctr1++) {
          distance = Math.pow((particlesArray[ctr].x - particlesArray[ctr1].x),2) 
            + Math.pow((particlesArray[ctr].y - particlesArray[ctr1].y),2);
          if (distance < threshold && particlesArray[ctr].x < particlesArray[ctr1].x ) {
            opacity = 1 - (distance * 0.00005);
            ctx.strokeStyle = 'rgba(0, 0, 0,' + opacity + ')';
            ctx.beginPath();
            ctx.moveTo(particlesArray[ctr].x, particlesArray[ctr].y);
            ctx.lineTo(particlesArray[ctr1].x, particlesArray[ctr1].y);
            ctx.stroke();
          }
        }
      }
    }


    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
     */
    function animate() {
      requestAnimationFrame(animate);
      canvas.style.willChange = "transform";
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let count = 0; count < particleNumber; count++) {
        particlesArray[count].update();
      }
      connect();
      canvas.style.willChange = "auto";
    }

    init();
    animate();
  }

  OnLogin(): void
  {
    this.loginUser = new LoginUser(this.usrName, this.password);
    this.authService.login(this.loginUser).subscribe(
      {next: (data) =>
        {
          this.isLogged = true;
          this.isLogInFailed = false;
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.userName);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;
          this.router.navigate(['']);
        },
        error: (err) => 
        {
          this.isLogged = false;
          this.isLogInFailed = false;
          this.errMsg = err.error.message;
          window.alert(this.errMsg);
        }
      }
      )
  }

}
