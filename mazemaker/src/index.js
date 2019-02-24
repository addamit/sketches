import p5 from 'p5';
import {Cell} from './cell.js';

console.log('test!!');

const s = (sketch) => {

	var cols;
	var rows;
	var w = 20;


	var canvasWidth  = 600;
	var canvasHeight = 600;
	var grid = [];
	var current;
	var stack = [];

	sketch.setup = function() {
		
		sketch.createCanvas(canvasWidth, canvasHeight);
		sketch.frameRate(30);
		cols = Math.floor(canvasWidth / w);
		rows = Math.floor(canvasHeight / w);

		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < cols; j++) {
				// console.log("At (i, j) = ("+i+", "+j+")");
				var cell = new Cell(i, j, w);
				cell.setup();
				grid.push(cell);
			}
		}

		current = grid[0];
		stack.push(current);
	}

	sketch.removeWalls = function(current, next) {

		 
		var xx = next.i - current.i;
		var yy = next.j - current.j;

		//going down 
		if(xx === 1 && yy === 0) {
			current.walls[2] = false;
			next.walls[0]    = false;
			// console.log("going down from ("+current.i+", "+current.j+") to ("+next.i+", "+next.j+")");
		} 
		// going up 
		else if (xx === -1 && yy === 0) {
			current.walls[0] = false;
			next.walls[2]    = false;			
			// console.log("going up from ("+current.i+", "+current.j+") to ("+next.i+", "+next.j+")");
		}
		// going right
		else if (xx === 0 && yy === 1) {
			current.walls[1] = false;
			next.walls[3]    = false;			
			// console.log("going right from ("+current.i+", "+current.j+") to ("+next.i+", "+next.j+")");
		}
		// going left
		else if (xx === 0 && yy === -1) {
			current.walls[3] = false;
			next.walls[1]    = false;			
			// console.log("going left from ("+current.i+", "+current.j+") to ("+next.i+", "+next.j+")");
		}
	}

	sketch.draw = function() {
		sketch.background(51);
		for(var i=0; i<grid.length; i++) {
			grid[i].draw(sketch);
		}

		current.visited = true;
		current.drawHead(sketch);

		var next = current.checkNeighbours(cols, grid);
		if(next) {			
			sketch.removeWalls(current, next);
			next.visited = true;
			current = next;
			stack.push(current);
		} else {
			var n = stack.pop();
			current = n;
		}
	}
}


var myp5 = new p5(s);