constructor(x,y, figure) {
	super(x,y);
	switch (figure) {
		case "Figure_I":
			this.figure = [ new Square(x,y), new Square(x+sizeSide), new Square(x+2*sizeSide), new Square(x+3*sizeSide)];
			break;
		case "Figure_J":
			this.figure = [ new Square(x,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //blue
			break;
		case "Figure_L":
			this.figure = [ new Square(x+2*sizeSide,y), new Square(x,y+sizeSide), new Square(x+sizeSide, y+sizeSide), new Square(x+2*sizeSide,y+sizeSide)]; //orange
			break;
		case "Figure_O":
			this.figure = [ new Square(), new Square(), new Square(), new Square()]; //yelow
			break;
		case "Figure_S":
			this.figure = [ new Square(), new Square(), new Square(), new Square()]; //green
			break;
		case "Figure_T":
			this.figure = [ new Square(), new Square(), new Square(), new Square()]; //purpure
			break;
		case "Figure_Z":
			this.figure = [ new Square(), new Square(), new Square(), new Square()]; //red
			break;
		default:
			console.log("Figure isn't exist!\n");
	}
}


clear(){
	for (let i = 0; i < this.figure.length; i++) {
		this.figure[i].clear();
	}
}
