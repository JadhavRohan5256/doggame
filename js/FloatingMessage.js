export class FloatingMessage {
    constructor(value, x, y, targetX, targetY) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markForDeletion = false;
        this.cnt = 0;
    }

    update() {
        this.x += (this.targetX - this.x)*0.035;
        this.y += (this.targetY - this.y)*0.035;
        this.cnt++;
        if(this.cnt > 150) {
            this.markForDeletion = true;
            this.cnt = 0;
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = '#006400';
        ctx.shadowBlur = 1;
        ctx.font = '30px Creepster';
        ctx.fillStyle = '#121212';
        ctx.fillText(this.value, this.x, this.y);
        ctx.fill();
        ctx.restore();
    }
}