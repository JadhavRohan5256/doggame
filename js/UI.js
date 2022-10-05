export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Creepster'
        this.color = '#121212';
        this.live = livesSprite;
    }
    draw(ctx) {
        
        if(this.game.gameOver) this.displayGameOver(ctx);
        this.remainingLives(ctx);
        this.scoreBoard(ctx);
    }
    
    // showing score on dashboard 
    scoreBoard(ctx) {
        ctx.save();
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 1;
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = 'left';
        ctx.fillStyle = this.color;
        let remaining = Math.abs((this.game.gameTime * 0.001).toFixed(1));
        let modifiedRemaining = (remaining > 60) ? (remaining / 60).toFixed(1) + 'm' : remaining + 's';
        ctx.fillText(`Score ${this.game.score}`, 20, 30);
        ctx.fillText(`time ${modifiedRemaining}`, 20, 55);
        ctx.restore();
    }

    // remaining live when dog hit enemy
    remainingLives(ctx) {
        ctx.save();
        ctx.shadowOffsetY = 1;
        ctx.shadowOffsetX = 1;
        ctx.shadowBlur = 1;
        let liveColor = (this.game.lives <= 3) ? '#ff0000' : '#006400';
        ctx.shadowColor = liveColor;
        for(let i = 0; i < this.game.lives; ++i) {
            ctx.drawImage(this.live, 25 * i + 20, 60, 25, 25);
        }
        ctx.restore();
    }

    // game over message  
    displayGameOver(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 2;
        ctx.textAlign='center'
        ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        if(this.game.score > 5) {
            ctx.fillText(`Boo-yah`, this.game.canvasWidth * 0.5, this.game.canvasHeight * 0.5 - 20);
            ctx.font = this.fontSize * 0.7  + 'px ' + this.fontFamily;
            ctx.fillText(`What are creatures of the night afraid of!!`, this.game.canvasWidth * 0.5 , this.game.canvasHeight * 0.5 + 20);
        }
        else {
            ctx.fillText(`Love at first bite?`, this.game.canvasWidth * 0.5, this.game.canvasHeight * 0.5 - 20);
            ctx.font = this.fontSize * 0.7  + 'px ' + this.fontFamily;
            ctx.fillText(`Nope. Better luck next time!`, this.game.canvasWidth * 0.5 , this.game.canvasHeight * 0.5 + 20);
        }
        ctx.restore();
    }


}