const ballCounter = document.querySelector('p');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let count = 0;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Shape {
  x;
  y;
  velX;
  velY;

  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball extends Shape {
  size;
  color;
  exists;

  constructor(x, y, velX, velY, size, color) {
    super(x, y, velX, velY);
    this.size = size;
    this.color = color;
    this.exists = true;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
        }
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}

class EvilCircle extends Shape {
  color;
  size;

  constructor(x, y) {
    super(x, y, 20, 20);
    this.color =  "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
    this.size = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x = -(this.size);
    }

    if ((this.x - this.size) <= 0) {
      this.x = -(this.size);
    }

    if ((this.y + this.size) >= height) {
      this.y = -(this.size);
    }

    if ((this.y - this.size) <= 0) {
      this.y = -(this.size);
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          ballCounter.textContent = "Ball count: " + count;
        }
      }
    }
  }

  setControls() {
    let _this = this;

    window.onkeydown = function (e) {
      if (e.key === "a") {
        this.x -= _this.velX;
      } else if (e.key === "d") {
        this.x += _this.velX;
      } else if (e.key === "w") {
        this.y -= _this.velY;
      } else if (e.key === "s") {
        this.y += _this.velY;
      }
    };
  }

}

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'a':
      this.x -= this.velX;
      break;
    case 'd':
      this.x += this.velX;
      break;
    case 'w':
      this.y -= this.velY;
      break;
    case 's':
      this.y += this.velY;
      break;
  }
});


let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    size,
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")"
  );

  balls.push(ball);
  count++;
  ballCounter.textContent = "Ball count: " + count;
}

let evilBall = new EvilCircle(random(0, width), random(0, height), true);
evilBall.setControls();

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists === true) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
