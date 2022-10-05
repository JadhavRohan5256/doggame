export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.keyDown();
        this.keyUp();
    }

    keyDown() {
        window.addEventListener('keydown', (e) => {
            if (
                (e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'Enter')
                && this.keys.indexOf(e.key) == -1) {
                this.keys.push(e.key);
            }
            if(e.key === 'd') this.game.debugMode = !this.game.debugMode;
        });
    }

    keyUp() {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowDown' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}