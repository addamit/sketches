import p5 from 'p5';
console.log('water simulation!!');

function matrix( rows, cols, defaultValue){
  var arr = [];
  // Creates all lines:
  for(var i=0; i < rows; i++){
      // Creates an empty line
      arr.push([]);
      // Adds cols to the empty line:
      arr[i].push( new Array(cols));
      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
      }
  }

	return arr;
}

const s = (sketch) => {

	var canvasWidth  = 200;
	var canvasHeight = 200;
	var cols = 200;
	var rows = 200;
	var current = matrix(rows, cols, 150.0); 
	var previous = matrix(rows, cols, 150.0);
	var temp = matrix(rows, cols, 150.0) 
	var dampening = 0.99;

	sketch.preload = function() {

	}

	sketch.setup = function() {
		sketch.createCanvas(canvasWidth, canvasHeight);
		sketch.pixelDensity(1);

	}


sketch.mouseDragged = function() {
	console.log("x = "+sketch.mouseX+ " y="+sketch.mouseY);
	previous[sketch.mouseX][sketch.mouseY] = 255.0;
}
	sketch.draw = function() {
		sketch.background(0);
		sketch.loadPixels();
		for(var i=1; i<rows-1; i++) {
			for(var j=1; j<cols-1; j++) {

				current[i][j] = (previous[i-1][j] + previous[i+1][j]
					+ previous[i][j-1] + previous[i][j+1]) / 2 - current[i][j];

				current[i][j] = current[i][j] * dampening;

				var index = (i + j * cols)*4;
				sketch.pixels[index + 0] = current[i][j];
				sketch.pixels[index + 1] = 0;//current[i][j];
				sketch.pixels[index + 2] = current[i][j];
				sketch.pixels[index + 3] = 200;//current[i][j];

			}
		}

		

		for(var i=1; i<rows-1; i++) {
			for(var j=1; j<cols-1; j++) {
				temp[i][j] = current[i][j];
				current[i][j] = previous[i][j];
				previous[i][j] = temp[i][j];
			}
		}

		sketch.updatePixels();		
	}			
}

var myp5 = new p5(s);
