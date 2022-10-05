import {Standing,Sitting, Running, Jumping, Falling, Rolling, Diving, Hit} from './AllState.js';
import { CollisionAnimation } from './CollisionAnimation.js';
import { FloatingMessage } from './FloatingMessage.js';
export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = (6876 / 12) + 2;
        this.spriteHeight = (5230 / 10);
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = 0;
        
        this.y = this.game.canvasHeight- this.height - this.game.marginBottom;
        this.img = dogSprite;
        this.playerState = [new Standing(this.game), new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.currentState = this.playerState[0];
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.vh = 0;
        this.weight = 1;
        this.speed = 10;
        this.playerTime = 0;
        this.fps = 20;
        this.timeInterval = 1000 / this.fps;
    }

    update(input, deltaTime) {
        this.currentState.inputHandle(input);
        if(input.includes('ArrowLeft') && this.currentState !== this.playerState[7]) this.x -= this.speed;
        if(input.includes('ArrowRight') && this.currentState !== this.playerState[7]) this.x += this.speed;
        if(this.x <= 0) this.x = 0;
        if(this.x + this.width >= this.game.canvasWidth) this.x = this.game.canvasWidth - this.width;
        // vertical movement
        this.y += this.vh;
        if(!this.onGround()) {
            this.vh += this.weight;
        }
        else {
            this.vh = 0;
        }

        if(this.playerTime > this.timeInterval) {
            (this.frameX < this.maxFrame)? this.frameX++ : this.frameX = 0;
            this.playerTime = 0;
        }
        else {
            this.playerTime += deltaTime;
        }
        if(this.y > this.game.canvasHeight - this.height - this.game.marginBottom) this.y = this.game.canvasHeight - this.height - this.game.marginBottom;
        this.collisionDetection();
    }

    draw(ctx) {
        if(this.game.debugMode) {
            ctx.beginPath();
            ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, Math.PI * 2, false);
            ctx.stroke();
        }
        ctx.save();
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowColor = '#B00020';
        ctx.shadowBlur = 2;
        ctx.drawImage(this.img, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    setState(state, stateSpeed) {
        this.currentState = this.playerState[state];
        this.currentState.enter();
        this.game.speed = stateSpeed * this.game.maxSpeed;
    }

    onGround() {
        return this.y >= (this.game.canvasHeight - this.height - this.game.marginBottom);
    }

    collisionDetection() {
        this.game.enemies.forEach((enemy) => {
            if(enemy.x < this.x + this.width &&
               enemy.x + enemy.width > this.x &&
               enemy.y < this.y + this.height && 
               enemy.y + enemy.height > this.y) {
                //    dog and enemy colliode 
                enemy.markForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                if(this.currentState === this.playerState[5] || 
                    this.currentState === this.playerState[6]) {
                        if(this.currentState === this.playerState[6])  {
                            this.game.score += 5;
                            this.game.temScore += 5;
                            this.game.floatingMessage.push(new FloatingMessage("+5", enemy.x, enemy.y, 90, 30));
                        }
                        else { 
                            this.game.score++;
                            this.game.temScore++;
                            this.game.floatingMessage.push(new FloatingMessage("+1", enemy.x, enemy.y, 90, 30));
                        }
                    }
                   else {
                    this.setState(7, 0);
                    this.game.lives--;
                    if(this.game.lives <= 0) this.game.gameOver = true;
                }
            }
        });
    }
}