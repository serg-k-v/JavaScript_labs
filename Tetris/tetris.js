var lightGrFill = "#7ed9c3";
var blackRect = "#102d0e";
var xRange = 500;
var yRange = 800;
var sizeSide = 50;
var count_level;
var level;
var lienes_for_delete = [];
var speed = 700;

let interval;
var matrixFigure;
var figureArr = ["Figure_I", "Figure_J", "Figure_L", "Figure_O", "Figure_S", "Figure_T","Figure_Z"];

function draw(x, y){
	ctx.fillStyle = lightGrFill;
	ctx.lineWidth = 2; // width of stroke
	ctx.fillRect(x+2, y+2, sizeSide-2, sizeSide-2);
	ctx.strokeStyle = blackRect;
	ctx.strokeRect(x+2, y+2, sizeSide-4, sizeSide-4);
}
function drawNext(x, y){
	ctx2.fillStyle = lightGrFill;
	ctx2.lineWidth = 2; // width of stroke
	ctx2.fillRect(x+2, y+2, sizeSide-2, sizeSide-2);
	ctx2.strokeStyle = blackRect;
	ctx2.strokeRect(x+2, y+2, sizeSide-4, sizeSide-4);
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
	possibleRotate(center){
		let tmp_x = this.x + sizeSide/2 - center.x;
		let tmp_y = this.y + sizeSide/2 - center.y;
        let new_x = center.x - sizeSide/2 - tmp_y;
        let new_y = center.y - sizeSide/2 + tmp_x;
		// console.log("new_x= ", new_x, "new_y", new_y);
		return {new_x: new_x, new_y: new_y};
	}
}

class Figure {
	constructor(x, y, figure, flag = true) {
		this.flag_move = flag;
		switch (figure) {
			case "Figure_I":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x+2*sizeSide,y), new Square(x+3*sizeSide,y)];
				this.center = {x: sizeSide*6, y: sizeSide};
				break; //turquoise
			case "Figure_J":
				this.figure = [ new Square(x,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //blue
				this.center = {x: sizeSide*5.5, y: sizeSide*1.5};;
				break;
			case "Figure_L":
				this.figure = [ new Square(x+2*sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //orange
				this.center = {x: sizeSide*5.5, y: sizeSide*1.5};
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
		if(this.flag_move){
			if(this.canRotate()){
				this.clear();
				for (let sq of this.figure) {
					sq.rotate(this.center);
				}
			}
		}
        this.draw();
	}
	canRotate(){
		let cnt = 0;

		// let x_min = Math.min.apply(null, this.figure.map(item => item.x));
		// let x_max = Math.max.apply(null, this.figure.map(item => item.x));

		var y_max = 0;
		var y_min = sizeSide*15;


		for(let i of this.figure){
			let new_coords = i.possibleRotate(this.center);
			if(y_max < new_coords.new_y)
				y_max = new_coords.new_y;
			if(y_min > new_coords.new_y)
				y_min = new_coords.new_y;

			if( matrixFigure[new_coords.new_y/sizeSide][new_coords.new_x/sizeSide] != undefined && !matrixFigure[new_coords.new_y/sizeSide][new_coords.new_x/sizeSide] /*&& new_coords.new_y < yRange - sizeSide */){
				cnt++;
			}
			// console.log("new coordinates x = ", new_coords.new_x, "y = ", new_coords.new_y);
			// console.log("x = ", i.x, "y = ", i.y);
			// console.log(matrixFigure[new_coords.new_y/sizeSide][new_coords.new_x/sizeSide]);
		}

		if(y_max > yRange){
			// console.log("RANNGEE");
			return false;
		}

		if(y_min === 0)
		return false;

		if(cnt === this.figure.length){
			return true;
		}else {
			return false;
		}
	}

	clear(){
		for (let i of this.figure) {
			ctx.clearRect(i.x, i.y, sizeSide, sizeSide);
		}
	}
	draw() {
		for (let i of this.figure) {
				draw(i.x, i.y);
		}
	}

	drawNext() {
		for (let i of this.figure) {
				drawNext(i.x-sizeSide*4, i.y+sizeSide);
		}
	}
	clearNext(){
		for (let i of this.figure) {
			ctx2.clearRect(i.x-sizeSide*4, i.y+sizeSide, sizeSide, sizeSide);
		}
	}

	down(){
		console.log(matrixFigure);
		this.clear();// let y_max = Math.max.apply(null, this.figure.map(item => item.y));
		if(this.canMoveDown()){  /*y_max < yRange - sizeSide ||*/
			for(let i of this.figure){
				i.y = i.y + sizeSide;
			}
			this.center.y += sizeSide;
		}else {
			for(let i of this.figure){
				matrixFigure[i.y/sizeSide][i.x/sizeSide] = 1;
				console.log("y = ", i.y, "x = ", i.x);
			}
			this.flag_move = false;

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
			if( !matrixFigure[i.y/sizeSide+1][i.x/sizeSide]){
				cnt++;
			}
		}
		if(cnt === this.figure.length){
			return true;
		} /*else if(y_max === 0 || y_max === 1){
			return true;
		} */else {
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
}

document.addEventListener('keydown', (event) => {
	const keyName = event.key;
	switch (keyName) {
		case 'ArrowDown':
			f_curent.down();
			f_curent.draw()
			break;
		case "ArrowUp":
			f_curent.rotate();
			f_curent.draw();
			break;
		case "ArrowLeft":
			f_curent.left();
			f_curent.draw();
			break;
		case "ArrowRight":
			f_curent.right();
			f_curent.draw();
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
				arr[i][j] = 1;
			}else {
				arr[i][j] = 0;
			}
		}
 	}
 	return arr;
}

matrixFigure = matrixFill(yRange/sizeSide-1,10); // 15 = yRange/sizeSide-1; 10 = xRange/sizeSide

function checkOnLose() {
	for(let sq of f_next.figure){
        if (matrixFigure[sq.y/sizeSide + 1][sq.x/sizeSide+1]){
			// console.log("y = ", sq.y/sizeSide + 1, "x = ", );
            return false;
		}
	}
    return true;
}

function checkFullLine() {
	lienes_for_delete = [];
	for (var i = yRange/sizeSide-1; i > 1; i--) {
		 let count = 0;
		for (var j = 0; j < xRange/sizeSide; j++) {
			if(matrixFigure[i][j]){
				count++;
			}
		}
		if(count === xRange/sizeSide){
			lienes_for_delete.push(i);
		}
	}

	if(lienes_for_delete.length)
		return true;

	return false;
}

function clearLine() {
	for (let line of lienes_for_delete.reverse()) {
		console.log("clearing_line_is", line);
	    var image = ctx.getImageData(0, 0, canvas.width, (line)*sizeSide);
	    ctx.clearRect(0, 0, canvas.width, line*sizeSide);
	    ctx.putImageData(image, 0, sizeSide);
		recountMatrix(line);
		recountScore()
	}
}

function recountScore() {
	score = Math.floor(score + 1 + (level*2)/3);
	if(score > count_level*10){
		level++;
		speed = Math.floor(speed*0.45);
		console.log("speed= ",speed);
	}
	ctxScore.clearRect(0, 0, sizeSide*4, sizeSide)
	ctxScore.font = "40px Verdana"
	var gradient=ctxScore.createLinearGradient(0,0, fieldScore.width,0);
	gradient.addColorStop("0.4","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("0.1","red");
	ctxScore.fillStyle=gradient;
	ctxScore.fillText(score, 10, 40);
}

function recountMatrix(line) {
	for (let i = line; i > 1; i--){
		matrixFigure[i] = matrixFigure[i-1].slice();
	}
}

function startGame() {
	if(f_curent.flag_move){
		f_curent.draw();
		f_curent.down();

	}else {
		if(checkFullLine()){
			clearLine();
		}
		if(!checkOnLose()){
			console.log("IT'S TRUE");
			endGame();
		}

		f_curent = f_next;
		f_next.clearNext();

		f_next = new Figure(sizeSide*4, 0, figureArr[Math.floor(Math.random()*7)]);
		f_next.drawNext();
	}
}

function newGame() {
	clearInterval(interval);
	console.log("newGame");
	f_curent = new Figure(sizeSide*4, 0, figureArr[Math.floor(Math.random()*7)]);
	f_next = new Figure(sizeSide*4, 0, figureArr[Math.floor(Math.random()*7)]);
	f_next.drawNext();
	score = 0;
	level = 1;
	count_level = level;
	interval = setInterval( startGame, speed);

}

function endGame() {
	clearInterval (interval);
	ctx.clearRect(0,0, mainField.width, mainField.height);
	ctx2.clearRect(0,0, nextFigureField.width, nextFigureField.height);
	let img = new Image();
	var url = "/home/akuma/Desktop/JavaScript_labs/Tetris/gameOver.png";
	img.onload = function() {
		ctx.drawImage(img, 50, 200);
	}
	img.src = url;

}
