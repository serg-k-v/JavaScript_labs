var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');

var lightGrFill = "#92c8ad";
var blackRect = "#102d0e";
var xRange = 500;
var yRange = 800;
var sizeSide = 50;

let interval;
var matrixFigure
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
        let tmp_x = this.x + sizeSide/2 - center.x;
		let tmp_y = this.y + sizeSide/2 - center.y;
        this.x = center.x - sizeSide/2 - tmp_y;
        this.y = center.y - sizeSide/2 + tmp_x;
	}

	possibleRotate(){
		let tmp_x = this.x + sizeSide/2 - center.x;
		let tmp_y = this.y + sizeSide/2 - center.y;
        let new_x = center.x - sizeSide/2 - tmp_y;
        let new_y = center.y - sizeSide/2 + tmp_x;

		return {x: new_x, y: new_y};
	}

}

class Figure {
	constructor(x, y, figure, flag = true) {
		this.flag_move = flag;
		switch (figure) {
			case "Figure_I":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x+2*sizeSide,y), new Square(x+3*sizeSide,y)];
				this.center = {x: sizeSide*5, y: sizeSide};
				break; //turquoise
			case "Figure_J":
				this.figure = [ new Square(x,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //blue
				this.center = {x: sizeSide*5.5, y: sizeSide*0.5};;
				break;
			case "Figure_L":
				this.figure = [ new Square(x+2*sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //orange
				this.center = {x: sizeSide*5.5, y: sizeSide*0.5};
				break;
			case "Figure_O":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide,y+sizeSide)]; //yelow
				this.center = {x: sizeSide*5, y: sizeSide};
				break;
			case "Figure_S":
				this.figure = [ new Square(x+sizeSide, y), new Square(x+2*sizeSide, y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide)]; //green
				this.center = {x: sizeSide*5.5, y: sizeSide*1.5};
				break;
			case "Figure_T":
				this.figure = [ new Square(x+sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //purpure
				this.center = {x: sizeSide*5.5, y: sizeSide*1.5};
				break;
			case "Figure_Z":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x+sizeSide,y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //red
				this.center = {x: sizeSide*5.5, y: sizeSide*1.5};
				break;
			default:
				console.log("Figure isn't exist!\n");
		}
	}

	rotate(){
		this.clear();
		if(this.flag_move){
			if(this.canRotate()){
				for (let sq of this.figure) {
					// console.log("x = ", sq.x, "y = ", sq.y);
					console.log("center x = ", this.center.x, "center y = ", this.center.y);
					sq.rotate(this.center);
				}
			}
		}
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
		this.clear();// let y_max = Math.max.apply(null, this.figure.map(item => item.y));
		if(this.canMoveDown()){  /*y_max < yRange - sizeSide ||*/
			for(let i of this.figure)
				i.y = i.y + sizeSide;

			this.center.y += sizeSide;
		}else {
			for(let i of this.figure){
				matrixFigure[i.y/50][i.x/50] = true;
				this.flag_move = false;
			}

		}
		this.draw();
	}

	left(){
		this.clear();
		let x_min = Math.min.apply(null, this.figure.map(item => item.x));
		if(this.flag_move){
			if( x_min > 0 && this.canMoveLeft()){
				for(let i of this.figure){
					i.x = i.x - sizeSide;
				}
				this.center.x -= sizeSide;
			}
		}
		this.draw();
	}

	right(){
		this.clear();
		let x_max = Math.max.apply(null, this.figure.map(item => item.x));
		if(this.flag_move){
			if( x_max < xRange - sizeSide && this.canMoveRight() ){
				for(let i of this.figure){
					i.x = i.x + sizeSide;
				}
				this.center.x += sizeSide;
			}
		}
		this.draw();
	}

	canMoveDown(){
		let cnt = 0;
		for(let i of this.figure){
			if( !matrixFigure[i.y/sizeSide+1][i.x/sizeSide] ){
				cnt++;
			}
		}
		if(cnt === this.figure.length){
			return true;
		}else {
			return false;
		}
	}

	canMoveLeft(){
		let cnt = 0; //let x_min = Math.min.apply(null, this.figure.map(item => item.x));
		for(let i of this.figure){
			if( !matrixFigure[i.y/sizeSide][i.x/sizeSide-1] ){
				cnt++;
			}
		}
		if(cnt === this.figure.length){
			return true;
		}else {
			return false;
		}
	}

	canMoveRight(){
		let cnt = 0; //let x_min = Math.min.apply(null, this.figure.map(item => item.x));
		for(let i of this.figure){
			if( !matrixFigure[i.y/sizeSide][i.x/sizeSide+1] ){
				cnt++;
			}
		}
		if(cnt === this.figure.length){
			return true;
		}else {
			return false;
		}
	}

	canRotate(){
		let cnt = 0; //let x_min = Math.min.apply(null, this.figure.map(item => item.x));
		for(let i of this.figure){
			if( !matrixFigure[i.y/sizeSide][i.x/sizeSide+1] ){
				cnt++;
			}
		}
		if(cnt === this.figure.length){
			return true;
		}else {
			return false;
		}
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

function matrixFill(rows,columns){
 	var arr = new Array();
 	for(var i=0; i<rows+2; i++){
		arr[i] = new Array();
		for(var j=0; j<columns; j++){
			if(i===rows+1 || i===0){
				arr[i][j] = true;
			}else {
				arr[i][j] = false;
			}
		}
 	}
 	return arr;
}

matrixFigure = matrixFill(yRange/sizeSide-1,10); // 15 = yRange/sizeSide-1; 10 = xRange/sizeSide


/****************************/
function checkOnLose() {
	return false;
}

function checkFullLine() {
	var clearing_line_is;
	var count = 0;
	for (var i = 1; i < 17; i++) {
		count = 0;
		for (var j = 0; j < 10; j++) {
			if(matrixFigure[i][j] && i != 0){
				count++;
			}
			console.log("count=", count);
		}
		if(count === j){
			console.log(count, "==", j);
			clearing_line_is = i;
			return true;
		}
	}
	return false;
}

function clearLine() {
	console.log("clearing_line_is", clearing_line_is);
    var image = ctx.getImageData(0, 0, canvas.width, (clearing_line_is-1)*sizeSide);
    ctx.clearRect(0, 0, canvas.width, clearing_line_is*sizeSide);
    ctx.putImageData(image, 0, sizeSide);
	score++;
	recountMatrix();
}

function recountMatrix() {
	for (let i = clearing_line_is; i > 1; i--){
        matrix[i] = matrix[i-1];
    }
}

/***************************/

function startGame() {
	console.log(matrixFigure);

	if(f.flag_move){ //f.canMoveDown
		f.draw();
		f.down();
	}else {
		// console.log(matrixFigure);

		// if(checkFullLine())
		// 	clearLine();
		// if(checkOnLose()){
		// 	endGame();
		// }

		f = new Figure(200, 0, figureArr[Math.floor(Math.random()*7)]); // new Figure(200, 0, "Figure_O");// */new Figure(200, 0, "Figure_I");
	}
}

function newGame() {
	clearInterval(interval);
	console.log("newGame");
	f = new Figure(200, 0, figureArr[Math.floor(Math.random()*7)]); //	new Figure(200, 0, "Figure_O"); //new Figure(200, 0, figureArr[Math.floor(Math.random()*7)]);
	score = 0;
	interval = setInterval( startGame, 500 );

}

function endGame() {
	flag_move = false;
    clearInterval (interval);
    alert('GAME OVER !');

}
