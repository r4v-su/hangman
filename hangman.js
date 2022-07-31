class HangmanCanvas {
	constructor() {
		this.canvasConfig = {
			width: "150px",
			bgCol: "none",
			drawCol: "rgb(255, 217, 0)",
			border: "dotted",
			borderCol: "black",
			padding: "10px",
			lineWidth: 2,
		};
		this.canvasElement = this.createCanvas();
		this.ctx = this.canvasElement.getContext("2d");
		this.ctx.lineWidth = this.canvasConfig.lineWidth;
	}

	drawStickman = (arg) => {
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
				this.draw(60, 70, 100, 100);
				break;
			case 10:
				this.draw(60, 70, 20, 100);
				break;
			default:
				break;
		}
	};

	createCanvas = function () {
		const canvas = document.createElement("canvas");
		canvas.setAttribute("width", this.canvasConfig.width);
		canvas.style.backgroundColor = this.canvasConfig.bgCol;
		canvas.style.border = this.canvasConfig.border;
		canvas.style.borderColor = this.canvasConfig.borderCol;
		canvas.style.padding = this.canvasConfig.padding;
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
	//drawing clearing  canvas
	clearCanvas = function () {
		this.ctx.fillStyle = this.canvasConfig.bgCol;
		this.ctx.fillRect(
			0,
			0,
			this.canvasElement.width,
			this.canvasElement.height
		);
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
class KeyboardPanel {
	constructor() {
		this.panel = this.makePanel();
		this.keyboard = this.makeKeyboard();
		this.keys = this.makeKeys();
		this.addkeys(this.keys, this.keyboard);
	};

	makePanel = () => {
		const panel = document.createElement("div");
		panel.classList.add("panel-container");
		return panel;
	};

	makeKeyboard = () => {
		const div = document.createElement("ul");
		div.classList.add("keyboard");
		return div;
	};

	appendPanel = (div) => {
		this.panel.appendChild(this.keyboard);
		div.appendChild(this.panel);
	};

	makeKeys = () => {
		const keys = [];
		const root = "ABCDEFGHIKLMNOPQRSTVXYZ-";
		const alphabet = [...root];

		alphabet.forEach((element) => {
			if(element !== ' ') {
			let key = document.createElement("li");
			key.classList.add("no_sel");
			key.setAttribute("data-set", element.toUpperCase());
			key.innerText = element;
			keys.push(key)
		} else {
			//future change -> qwerty keyboard layout
			return
		}

		});
		return keys;
	};

	addkeys = function (keys, keyboard) {
		keys.forEach((key) => {
			keyboard.appendChild(key);
		});
	};

	hidePanel = () => {
		this.panel.style.display = "none";
	};

	showPanel = () => {
		this.panel.style.display = "block";
	};

	resetKeys = () => {
		this.keys.forEach((key) => {
			key.classList.remove("used");
		});
	};
}
class PasswordPanel {
	constructor(password) {
		this.panel = this.makePanel();
		this.password = [...password];
		this.keyboard = this.makePassBoard();
		this.keys = this.makeKeys();
		this.addkeys(this.keys, this.keyboard);
	};

	makePanel = () => {
		const panel = document.createElement("div");
		panel.classList.add("panel-container");
		return panel;
	};
	makePassBoard = () => {
		const div = document.createElement("ul");
		div.classList.add("password");
		return div;
	};

	appendPanel = (div) => {
		this.panel.appendChild(this.keyboard);
		div.appendChild(this.panel);
	};

	hidePanel = () => {
		this.panel.style.display = "none";
	};

	showPanel = () => {
		this.panel.style.display = "block";
	};

	addkeys = function (keys, keyboard) {
		keys.forEach((key) => {
			keyboard.appendChild(key);
		});
	};

	makeKeys = () => {
		const keys = [];
		const alphabet = this.password;
		alphabet.forEach((element) => {
			let key = document.createElement("li");
			key.classList.add("no_sel");
			key.setAttribute("data-set", element.toUpperCase());
			key.innerText = "_";
			keys.push(key);
		});
		return keys;
	};

	resetKeys = () => {
		this.keys.forEach((key) => {
			key.innerText = "_";
		});
	};
}

class Modal {
	constructor(result) {
		this.win = result;
	}
	createModal = (win) => {
		const text = (function(arg) { 
			if(arg) return 'YOU WON';
			else return 'YOU  LOOSE'
		})(win);

		const modalStyle = (function(arg) {
			if (arg) return 'modal_title--win'
			else return 'modal_title--loose'
		 })(win);
		const modal = document.createElement('div');
		modal.classList.add('modal');
		const modalTitle = document.createElement('span')
		modalTitle.classList.add(modalStyle)
		modalTitle.innerText = text;
		const modalButton = document.createElement("button");
		modalButton.classList.add('modal_button')
		modalButton.innerText = "RESTART";
		modalButton.onclick = () => {location.reload()};
		modal.appendChild(modalTitle)
		modal.appendChild(modalButton)
		document.body.appendChild(modal);
	}


}
class HangmanGame {
	constructor(div, password) {
		this.game = {
			actualGuess: "",
			password: this.pass2UpperCase(password),
			lives: 0,
		};
		this.hangman = new HangmanCanvas();
		this.keyboardPanel = new KeyboardPanel();
		this.passwordPanel = new PasswordPanel(this.game.password);


		this.hangman.appendCanvas(div);
		this.keyboardPanel.appendPanel(div);
		this.passwordPanel.appendPanel(div);
		this.modal = new Modal;

		this.bindEventListeners(this.keyboardPanel.keys);
	};

	bindEventListeners = function (keys) {
		keys.forEach((key) => {
			key.addEventListener("click", (e) => {
				let clicked = e.target;
				if (!clicked.classList.contains("used")) {
					clicked.classList.add("used");
					this.game.actualGuess = clicked.innerText;
					this.checkIf();
					return clicked;
				}
			}, {once:true});
		});
	};

	checkIf = function() {
		if (this.game.password.includes(this.game.actualGuess)) {
			this.passwordPanel.keys.forEach((key) => {
				if (key.dataset.set == this.game.actualGuess) {
					key.innerText = key.dataset.set;
				};
			});
		} else {
			if (this.game.lives >= -9) {
				--this.game.lives
				this.hangman.drawStickman(this.game.lives * -1);
			} else {
				this.modal.createModal(false)
				
				/*const div = document.createElement("div");
				div.innerHTML = "<h1>YOU LOOSE</h1>";

				const modal = document.createElement("div");
				modal.appendChild(div);
				div.appendChild(modalButton);
				modal.classList.add("modal");
				document.body.appendChild(modal);*/

				/*this.hangman.clearCanvas();
				this.passwordPanel.resetKeys();
				this.keyboardPanel.resetKeys();*/
			};
		};
	};

	pass2UpperCase = function (password) {
		return password.toUpperCase();
	};
}

createNewApp = (password) => {
	const appDiv = document.getElementById("app-container");
	const Div = document.createElement("div");
	Div.classList.add("app");
	appDiv.appendChild(Div);
	new HangmanGame(Div, password);
};

async function getData(
	url = "http://random-word-form.herokuapp.com/random/noun"
) {
	fetch(url)
		.then((response) => response.json())
		.then((result) => createNewApp(result[0]));
};

getData();
