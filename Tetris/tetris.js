var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');

var lightGrFill = "#92c8ad";
var blackRect = "#102d0e";
var xRange = 500;
var yRange = 800;
var sizeSide = 50;

function draw(x, y){
	ctx.fillStyle = lightGrFill;
	ctx.lineWidth = 2; // width of stroke
	ctx.fillRect(x+2, y+2, sizeSide-2, sizeSide-2);
	ctx.strokeStyle = blackRect;
	ctx.strokeRect(x+2, y+2, sizeSide-2, sizeSide-2);
}

function clear(arr) {
	for (let i of arr) {
		ctx.clearRect(i.x, i.y, sizeSide+1, sizeSide+1);
	}
}

class Square {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

class Figure {
	constructor(x,y, figure) {
		switch (figure) {
			case "Figure_I":
				this.figure = [ new Square(x,y), new Square(x+sizeSide,y), new Square(x+2*sizeSide,y), new Square(x+3*sizeSide,y)];
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
	rotate(){};

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
		clear(this.figure);
		let y_max = Math.max.apply(null, this.figure.map(item => item.y));
		for(let i of this.figure){
			if( y_max < yRange - sizeSide){  //???????
				i.y = i.y+ sizeSide;
			}
		}
		draw();
	};

	left(){
		clear(this.figure);
		let x_min = Math.min.apply(null, this.figure.map(item => item.x));
		for(let i of this.figure){
			if( x_min > 0 ){
				i.x = i.x - sizeSide;
			}
		}
	};

	right(){
		clear(this.figure);
		let x_max = Math.max.apply(null, this.figure.map(item => item.x));
		for(let i of this.figure){
			if( x_max < xRange - sizeSide ){
				i.x = i.x + sizeSide;
			}
		}
	};
}


	// var f = new Figure(200, 0, "Figure_L");
	// f.draw();

	document.addEventListener('keydown', (event) => {
		const keyName = event.key;
		switch (keyName) {
			case 'ArrowDown':
				f.down();
				f.draw()
				break;
			case "ArrowLeft":
				f.left();
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
