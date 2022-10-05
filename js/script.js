import { Player } from './Player.js';
import { InputHandler } from './InputHandler.js'
import { Background } from './Background.js';
import { FlayingBird, Spider, Worm } from './Enemies.js';
import { UI } from './UI.js';
window.addEventListener('load', () => {
    /** @type{HTMLCanvasElement} */
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = window.innerWidth;
    const canvasHeight = 720;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    class Game {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.marginBottom = 120;
            this.speed = 0;
            this.maxSpeed = 4;
            this.instance();
            this.timer = 0;
            this.timerInterval = 1000;
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessage = [];
            this.maxParticle = 200;
            this.debugMode;
            this.score = 0;
            this.temScore = 0;
            this.gameTime = 300000;
            this.gameOver = false;
            this.lives = 5;
        }
        instance() {
            this.player = new Player(this);
            this.inputHandler = new InputHandler(this);
            this.background = new Background(this);
            this.ui = new UI(this);
        }
        update(deltaTime) {
            this.gameTime -= deltaTime;
            if(this.gameTime <= 0) this.gameOver = true;
            if(this.timer > this.timerInterval) {
                this.addEnemy();
                this.timer = 0;
            }
            else {
                this.timer += deltaTime;
            }
            
            if((this.temScore / 100) >= 1) {
                if(this.lives < 5) this.lives++;
                this.temScore -= 100;
            }

            this.background.update();
            this.player.update(this.inputHandler.keys, deltaTime);

            //array for update
            this.enemies.forEach((enemy, i) => {
                enemy.update(deltaTime);
            });

            this.particles.forEach((particle, i) => {
                particle.update();
            });
            this.collisions.forEach((collsion, i) => {
                collsion.update(deltaTime);
            })
            this.floatingMessage.forEach((message) => {
                message.update();
            })
            
            // removing unused array element
            this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion);
            this.particles = this.particles.filter((particle) => !particle.markForDeletion);
            this.collisions = this.collisions.filter((collision) => !collision.markForDeletion);
            this.floatingMessage = this.floatingMessage.filter((message)=> !message.markForDeletion);
            if(this.particles.length > this.maxParticle) this.particles =  this.particles.splice(0, this.maxParticle);
        }
        draw(ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx);

            //enemies array for draw
            this.enemies.forEach(enemy => {
                enemy.draw(ctx);
            });
            this.ui.draw(ctx);

            //particle arry for draw
            this.particles.forEach((particle) => {
                particle.draw(ctx);
            })

            //collision array for draw
            this.collisions.forEach((collsion) => {
                collsion.draw(ctx);
            })

            this.floatingMessage.forEach((message) => {
                message.draw(ctx);
            })
        }

        addEnemy() {
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new Worm(this));
            else if(this.speed > 0) this.enemies.push(new Spider(this));
            this.enemies.push(new FlayingBird(this));
        }
    }

    const game = new Game(canvasWidth, canvasHeight);
    let lastTime = 0;
    function animate(timer) {
        let deltaTime = timer - lastTime;
        lastTime = timer;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});