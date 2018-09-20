var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');

var lightGrFill = "#92c8ad";
var blackRect = "#102d0e";
var xRange = 500;
var yRange = 800;
var sizeSide = 50;

let interval;
var f;

var matrixFigure;

var figureArr = ["Figure_I", "Figure_J", "Figure_L", "Figure_O", "Figure_S", "Figure_T","Figure_Z"];

function draw(x, y){
	ctx.fillStyle = lightGrFill;
	ctx.lineWidth = 2; // width of stroke
	ctx.fillRect(x+2, y+2, sizeSide-2, sizeSide-2);
	ctx.strokeStyle = blackRect;
	ctx.strokeRect(x+2, y+2, sizeSide-2, sizeSide-2);
}

class Square {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	rotate(center){
		let tmp_y = this.y - center.y;
        let tmp_x = this.x - center.x;
        this.x = center.x + tmp_y;
        this.y = center.y + tmp_x;
	}

}

class Figure {
	constructor(x, y, figure, flag = true) {
		this.flag_move = flag;
		switch (figure) {
			case "Figure_I":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x+2*sizeSide,y), new Square(x+3*sizeSide,y)];
				this.center = {x: sizeSide*5, y: sizeSide}
				break; //turquoise
			case "Figure_J":
				this.figure = [ new Square(x,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //blue
				break;
			case "Figure_L":
				this.figure = [ new Square(x+2*sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //orange
				break;
			case "Figure_O":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide,y+sizeSide)]; //yelow
				break;
			case "Figure_S":
				this.figure = [ new Square(x+sizeSide, y), new Square(x+2*sizeSide, y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide)]; //green
				break;
			case "Figure_T":
				this.figure = [ new Square(x+sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //purpure
				break;
			case "Figure_Z":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x+sizeSide,y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //red
				break;
			default:
				console.log("Figure isn't exist!\n");
		}
	}

	rotate(){
		this.clear();
        this.draw();
	}

	clear(){
		for (let i of this.figure) {
			ctx.clearRect(i.x, i.y, sizeSide+1, sizeSide+1);
		}
	}

	draw() {
		for (let i of this.figure) {
				draw(i.x, i.y);
		}
	}

	down(){
		this.clear();
		let y_max = Math.max.apply(null, this.figure.map(item => item.y));
		for(let i of this.figure){
			if( y_max < yRange - sizeSide /*checkNextMove()*/){  //???????
				i.y = i.y+ sizeSide;
			}else {
				matrixFigure[i.x/50][i.y/50] = true;
				// console.log("x = ", i.x/50, "y = ", i.y/50);
				this.flag_move = false;
			}
		}
		this.draw();
	}

	left(){
		this.clear();
		let x_min = Math.min.apply(null, this.figure.map(item => item.x));
		if(this.flag_move){
			for(let i of this.figure){
				if( x_min > 0 ){
					i.x = i.x - sizeSide;
				}
			}
		}
		this.draw();
	}

	right(){
		this.clear();
		let x_max = Math.max.apply(null, this.figure.map(item => item.x));
		if(this.flag_move){
			for(let i of this.figure){
				if( x_max < xRange - sizeSide ){
					i.x = i.x + sizeSide;
				}
			}
		}
		this.draw();
	}

}

document.addEventListener('keydown', (event) => {
	const keyName = event.key;
	switch (keyName) {
		case 'ArrowDown':
			f.down();
			f.draw()
			break;
		case "ArrowUp":
			f.rotate();
			f.draw();
			break;
		case "ArrowLeft":
			f.left();
			f.draw();
			break;
		case "ArrowRight":
			f.right();
			f.draw();
			break;
		default:
			console.log("Wrong key");
	}

});

function matrixArray(rows,columns){
 	var arr = new Array();
 	for(var i=0; i<rows; i++){
		arr[i] = new Array();
		for(var j=0; j<columns; j++){
			arr[i][j] = false;//вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
		}
 	}
 	return arr;
}

function arrayColumn(arr, n) {
  return arr.map(y => y[n]);
}

matrixFigure = matrixArray(10,16);  //FIX_IT

function checkMatrix() {
	let arr = arrayColumn(matrixFigure, 15);
	console.log(arr);
	for (let i of arr) {
		console.log(i);
		// console.log("pam pam", i);
		if(i)
			return true;
	}
	return false;
}

function startGame() {
	if(f.flag_move){
		f.draw();
		f.down();
	}else {
		checkFullLine();
		if(checkOnLose()){
			endGame();
		}
	}
	f = new Figure(200, 0, "Figure_I");
}

function newGame() {
	clearInterval(interval);
	console.log("newGame");
	f = new Figure(200, 0, "Figure_I"); // var f = new Figure(200, 0, figureArr[Math.floor(Math.random()*7)]);
	interval = setInterval( startGame, 1000 );

}
function endGame() {
	flag_move = false;
    clearInterval (interval);
    alert('GAME OVER !');

}
