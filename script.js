class HangmanCanvas {
	constructor(parentDiv) {
		this.canvasConfig = {
			width: "400px",
			height: "400px",
			bgCol: "none",
            drawCol: 'red',
			border: "dotted",
		};
		this.canvasElement = this.createCanvas();
		this.ctx = this.canvasElement.getContext("2d");
		this.head = this.drawManHead;
		this.drawStickman =(arg) =>{
			switch (arg) {
				case 1:
					this.draw(0, 125, 125, 125);
					break;
				case 2:
					this.draw(10, 0, 10, 600);
					break;
				case 3:
					this.draw(0, 5, 70, 5);
					break;
				case 4:
					this.draw(60, 5, 60, 15);
					break;
				case 5:
					this.drawHead();
					break;
				case 6:
					this.draw(60, 36, 60, 70);
					break;
				case 7:
					this.draw(60, 46, 100, 50);
					break;
				case 8:
					this.draw(60, 46, 20, 50);
					break;
				case 9:
					this.draw(60, 46, 100, 50);
					break;
				case 10:
					this.draw(60, 70, 100, 100);
					break;
				case 11:
                    this.draw(60, 70, 20, 100);
					break;

				default:
					break;
			}
		};
	}
	createCanvas = function () {
		const canvas = document.createElement("canvas");
		canvas.setAttribute("width", this.canvasConfig.width);
		canvas.style.backgroundColor = this.canvasConfig.bgCol;
		canvas.style.border = this.canvasConfig.border;
		console.log(this);
		return canvas;
	};
	appendCanvas = function (div) {
		div.appendChild(this.canvasElement);
	};
	hideCanvas = function () {
		this.canvasElement.style.display = "none";
	};
	showCanvas = function () {
		this.canvasElement.style.display = "block";
	};

	clearCanvas = function () {
		this.ctx.fillStyle = this.canvasConfig.bgCol;
		this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
	};
	draw = function (fromX, fromY, toX, toY) {
        this.ctx.strokeStyle = this.canvasConfig.drawCol;
		this.ctx.beginPath();
		this.ctx.moveTo(fromX, fromY);
		this.ctx.lineTo(toX, toY);
		this.ctx.stroke();
	};
	drawHead = function () {
		this.ctx.beginPath();
		this.ctx.arc(60, 25, 10, 0, Math.PI * 2, true);
		this.ctx.stroke();
	};
}

class HangmanGame {
	constructor(parentDiv) {
		this.parentDiv = parentDiv;
		this.hangman = new HangmanCanvas(this.parentDiv);
		this.hangman.appendCanvas(parentDiv);
        this.mylog();
	}

	mylog = function () {
        for(let i = 0; i <= 11; i++) {
            this.hangman.drawStickman(i)
        }
	};
}

class App {
	constructor(parentDiv) {
		this.parentDiv = document.querySelector("#app-container");
		this.hangman = new HangmanGame(this.parentDiv);
	}
}

new App();

