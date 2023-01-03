const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let particleNumber =  64;

let mouse = {
    x: null,
    y: null,
    //radius: 0
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function (event) {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

class Particle {
    constructor(x, y, dirX, dirY, size, color) {
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
        ctx.fillstyle = '#000000';
        ctx.fill();
    }

    update() {

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if ((this.x > canvas.width) || this.x < 0) {
            this.dirX *= -1;
        }

        if ((this.y > canvas.height) || this.y < 0) {
            this.dirY *= -1;
        }

        /*if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }

            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }

        }
        */

        /**
         * Update particle position
         */
        this.x += this.dirX;
        this.y += this.dirY;

        this.draw()
    }

}

function init() {
    let count = 0;
    while (count < particleNumber) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 5) - 2.5;
        let dirY = (Math.random() * 5) - 2.5;
        let color = '#000000';
        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
        count++;
    }
}

function connect() {
    let opacity = 1;
    let ctr = 0;
    while (ctr < particleNumber) {
        let ctr1 = 0;
        while (ctr1 < particleNumber) {
            let distance = ( (particlesArray[ctr].x - particlesArray[ctr1].x) * (particlesArray[ctr].x - particlesArray[ctr1].x) )
                        + ( (particlesArray[ctr].y - particlesArray[ctr1].y) * (particlesArray[ctr].y - particlesArray[ctr1].y) );
            if(distance < canvas.width*canvas.height*0.14285714285) {
                opacity = 1 - distance/20000;
                ctx.strokeStyle = 'rgba(0, 0, 0,' + opacity + ')';
                ctx.beginPath();
                ctx.moveTo(particlesArray[ctr].x, particlesArray[ctr].y);
                ctx.lineTo(particlesArray[ctr1].x, particlesArray[ctr1].y);
                ctx.stroke();
            }
            ctr1++;
        }
        ctr++;
    }
}


/**
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    let count = 0;
    while (count < particleNumber) {
        particlesArray[count].update();
        count++;
    }
    connect();
}

init();
animate();