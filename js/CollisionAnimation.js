export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = collisionAnimation;
        this.spriteWidth = 500 / 5;
        this.spriteHeight = 90; 
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markForDeletion = false;
        this.fps = 5;
    }
    update(deltaTime) {
        this.x -= this.game.speed;
        if(this.game.timer > (this.game.timerInterval / this.fps)) {
            this.frameX++;
            this.game.timer = 0;
        }
        else this.game.timer += deltaTime;

        if(this.frameX >= this.maxFrame) this.markForDeletion = true;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}