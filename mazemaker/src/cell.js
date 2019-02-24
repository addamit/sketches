

export function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.w = w;
	this.walls = [true, true, true, true];
	this.visited = false;
}


Cell.prototype.setup = function() {
	// console.log('inside cell setup');
}

Cell.prototype.checkNeighbours = function (maxCellsInRow, grid) {
	var neighbours = [];

	var left   = this.j - 1; // column to left
	var right  = this.j + 1; // column to right
	var top    = this.i - 1; // row to top
	var bottom = this.i + 1;  // row to bottom
	var idx;

	// console.log("Current cell at (i, j) = ("+this.i+", "+this.j+")");
	// console.log("left="+left+ " right="+right+" top="+top+" bottom="+bottom+ " maxCells="+maxCellsInRow);
	if(left >= 0 && left < maxCellsInRow) {
		idx = (left) + (this.i)  * maxCellsInRow ;
		// console.log("left neighbour at (i, j) = ("+(this.i)+", "+left+") idx="+idx+ " visited="+grid[idx].visited);
		if(!grid[idx].visited) {			
			neighbours.push(grid[idx]);
		}
	} 
	if(right >= 0 && right < maxCellsInRow) {
		idx =  right + (this.i) * maxCellsInRow ;

		// console.log("right neighbour at (i, j) = ("+(this.i)+", "+right+") idx="+idx+ " visited="+grid[idx].visited);
		if(!grid[idx].visited) {
			
			neighbours.push(grid[idx]);
		}	
	}
	if(top >= 0 && top < maxCellsInRow) {
		idx = (this.j) + (top  * maxCellsInRow) ;
		// console.log("top neighbour at (i, j) = ("+top+", "+(this.j)+") idx="+idx+ " visited="+grid[idx].visited);
		if(!grid[idx].visited) {
			neighbours.push(grid[idx]);
			
		}
	}
	if(bottom >= 0 && bottom < maxCellsInRow) {
		idx =  this.j + (bottom * maxCellsInRow) ;
		// console.log("bottom neighbour at (i, j) = ("+bottom+", "+(this.j)+") idx="+idx+ " visited="+grid[idx].visited);
		if(!grid[idx].visited) {			
			
			neighbours.push(grid[idx]);
		}
	}

	if(neighbours.length > 0 ) {
		var r = Math.floor(Math.random() * (neighbours.length));
		// console.log("Returning neighbour pos =("+neighbours[r].i+", "+neighbours[r].j+")");
		return neighbours[r];
	} 
	else 
		return undefined;

}

Cell.prototype.drawHead = function(sketch) {

	var x = this.j * this.w;
	var y = this.i * this.w;
	sketch.noStroke();
	sketch.fill(0, 0, 255);
	sketch.rect(x, y, this.w, this.w);

}

Cell.prototype.draw = function(sketch) {

	var x = this.j * this.w;
	var y = this.i * this.w;
	sketch.noFill();
	// sketch.rect(x, y, this.w, this.w);
	// console.log("At (x, y) = ("+x+", "+y+")");

	// top wall
	if(this.walls[0]) {
		sketch.stroke(255);
		sketch.line(x, y, x+this.w, y);
	} else {
		// console.log("turning off top wall for ("+x+", "+y+")");
	}

	// right wall
	if(this.walls[1]) {
		sketch.stroke(255);
		sketch.line(x+this.w, y, x+this.w, y+this.w);
	} else {
		// console.log("turning off right wall for ("+x+", "+y+")");
	} 

	// bottom wall
	if(this.walls[2]) {
		sketch.stroke(255);
		sketch.line(x+this.w, y+this.w, x, y+this.w);
	} else {
		// console.log("turning off bottom wall for ("+x+", "+y+")");
	}

	// left	wall
	if(this.walls[3]) {
		sketch.stroke(255);
		sketch.line(x, y+this.w, x, y);
	} else {
		// console.log("turning off left wall for ("+x+", "+y+")");
	}


	if(this.visited) {
		sketch.noStroke();
		sketch.fill(255, 0, 255, 100);
		sketch.rect(x, y, this.w, this.w);
	}

}
