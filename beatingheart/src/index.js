import p5 from 'p5';

console.log('test!!');

/**
easing function sourced from here:
https://gist.github.com/gre/1650294
*/
var EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
};
const s = (sketch) => {


	var canvasWidth  = 600;
	var canvasHeight = 600;
	var img;
	var img2; 
	var radius = 0;
	var easePct = 0;
	sketch.preload = function() {
		img = sketch.loadImage('./beetle5.PNG');
	}

	sketch.setup = function() {
		
		sketch.createCanvas(canvasWidth, canvasHeight);
		sketch.frameRate(30);
		// console.log("img width "+ img.width+ " height "+img.height);		
		// img2 = img.get(0, 0, 50, 50);
		// console.log(img2);
		radius = EasingFunctions['easeInOutQuint'](easePct);
	}

	sketch.draw = function() {
		sketch.background(0);
		// sketch.image(img2, 0, 0, 50, 50);
		easePct += 0.01;
		if(easePct >= 1.0) {
			easePct = 0.1;
		}
		radius = EasingFunctions['easeInOutQuint'](easePct);
		radius *= 10; 
		var baseRadius = 5;
		radius = baseRadius+radius;
		sketch.translate(canvasWidth/2, canvasHeight/2);
	
		sketch.noStroke();		
		sketch.fill(255, 0, 0 );
		sketch.beginShape();
		for(var a = 0; a<= sketch.TWO_PI; a += 0.01) {
			var x = radius * 16 * Math.pow(Math.sin(a), 3); // * Math.cos(a);
			var y =  -1* radius* (13 * Math.cos(a) - 5*Math.cos(2*a) - 2*Math.cos(3*a) - Math.cos(4*a));
			sketch.vertex(x, y);
		}
		sketch.endShape();
	}
}


var myp5 = new p5(s);

