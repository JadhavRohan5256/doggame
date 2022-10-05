class enemy {
    constructor(game) {
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.time = 0;
        this.speedX = Math.random() * 2 + 0.5;
        this.speedY = 0;
        this.fps = this.speedX * 30;
        this.timeInterval = 1000 / this.fps;
        this.markForDeletion = false;
    }

    update(deltaTime) {
        if(this.time > this.timeInterval) {
            (this.frameX < this.spriteFrame)? this.frameX++ : this.frameX = 0;
            this.time = 0;
        }
        else {
            this.time += deltaTime;
        }
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        if(this.x + this.spriteWidth <= 0) this.markForDeletion = true;
    }
    
    draw(ctx) {
        if(this.game.debugMode) {
            ctx.beginPath();
            ctx.strokeStyle="#000000";
            // ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, Math.PI * 2, false);
            ctx.stroke();
        }
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0,this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export class FlayingBird extends enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 360 / 6;
        this.spriteHeight = 44;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.image = enemyFly;
        this.spriteFrame = 5;
        this.x = this.game.canvasWidth;
        this.y = Math.random() * (this.game.canvasHeight / 2);
        this.angle = 0;
        this.vh = Math.random() * 0.1 + 0.1;
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.vh;
        this.y += Math.sin(this.angle);
    }
    draw(ctx) {
        super.draw(ctx);
    }
}

export class Worm extends enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 482 / 6;
        this.spriteHeight = 60;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.image = enemyWorm;
        this.x = this.game.canvasWidth;
        this.y = this.game.canvasHeight - this.spriteHeight - this.game.marginBottom;
        this.speedX = 0;
        this.spriteFrame = 5;
    }
}

export class Spider extends enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 720 / 6;
        this.spriteHeight = 144;
        this.size = Math.floor(Math.random() * 2 + 1);
        this.width = this.spriteWidth / this.size;
        this.height = this.spriteHeight / this.size;
        this.image = enemySpider;
        this.x = this.game.canvasWidth;
        this.y = Math.random() * this.game.canvasHeight / 2;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 2 : -2;
        this.spriteFrame = 5;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.y + this.height >= (this.game.canvasHeight - this.game.marginBottom)) this.speedY *= -1;
        if(this.y + this.width <= 0) this.markForDeletion = true;
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.moveTo(this.x + (this.width / 2),0);
        ctx.lineTo(this.x + (this.width / 2), this.y)
        ctx.stroke();
    }
}