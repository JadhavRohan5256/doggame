class Layer {
    constructor(game, spriteWidth, spriteHeight, img, speedModifier) {
        this.game = game;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.img = img;
        this.speedModifier = speedModifier;
        this.x = 0
        this.y = 0;
    }

    update() {
        (this.x <= -this.spriteWidth)? this.x = 0 : this.x -= this.game.speed * this.speedModifier;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.spriteWidth, this.spriteHeight);
        ctx.drawImage(this.img, this.x + this.spriteWidth, this.y, this.spriteWidth, this.spriteHeight);
    }
}


export class Background {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 2400;
        this.spriteHeight = 720;
        this.layer1 = backgroundSprite1;
        this.layer2 = backgroundSprite2;
        this.layer3 = backgroundSprite3;
        this.layer4 = backgroundSprite4;
        this.layer5 = backgroundSprite5;
        this.image1 = new Layer(this.game,this.spriteWidth, this.spriteHeight, this.layer1, 0.2);
        this.image2 = new Layer(this.game,this.spriteWidth, this.spriteHeight, this.layer2, 0.4);
        this.image3 = new Layer(this.game,this.spriteWidth, this.spriteHeight, this.layer3, 0.6);
        this.image4 = new Layer(this.game,this.spriteWidth, this.spriteHeight, this.layer4, 0.8);
        this.image5 = new Layer(this.game,this.spriteWidth, this.spriteHeight, this.layer5, 1);
        this.imageArr = [this.image1, this.image2, this.image3, this.image4, this.image5];
    }

    update() {
        this.imageArr.forEach((item) => {
            item.update();
        });
    }

    draw(ctx) {
        this.imageArr.forEach((item) => {
            item.draw(ctx);
        });
    }
}