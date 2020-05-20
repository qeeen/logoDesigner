var brush;
var brush_w;
var color;
var black;

var shap_ind;

var hue_slider;
var sat_slider;
var val_slider;

var circles;
var squares;
var triangles;

function setup(){
	let canv = createCanvas(768, 768);
	let canv_pos = canv.position();
	colorMode(HSB, 255);
	black = color(0, 0, 0);
	background(black);

	color = 0;
	brush = "circle";
	brush_w = 40;

	hue_slider = createSlider(0, 255, 120);
	hue_slider.position(canv_pos.x, canv_pos.y-width/15);

	sat_slider = createSlider(0, 255, 255*0.7);
	sat_slider.position(canv_pos.x + 200, canv_pos.y-width/15);

	val_slider = createSlider(0, 255, 255);
	val_slider.position(canv_pos.x + 400, canv_pos.y-width/15);

	circles = [];
	squares = [];
	triangles = [];
}

function draw(){
	background(black);
	noStroke();
	
	draw_shapes();

	get_color(color);
	switch(brush){
		case "circle":
			circle(mouseX, mouseY, brush_w);
			break;
		case "square":
			square(mouseX-brush_w/2, mouseY-brush_w/2, brush_w);
			break;
		case "triangle":
			triangle(mouseX, mouseY-brush_w/2, mouseX-brush_w/2, mouseY+brush_w/2, mouseX+brush_w/2, mouseY+brush_w/2);
			break;
	}
}

function draw_shapes(){
	for(let i = 0; i < circles.length; i++){
		let cshap = circles[i];
		get_color(cshap[3]);
		circle(cshap[0], cshap[1], cshap[2]);
	}
	for(let i = 0; i < squares.length; i++){
		let cshap = squares[i];
		get_color(cshap[3]);
		square(cshap[0]-cshap[2]/2, cshap[1]-cshap[2]/2, cshap[2]);
	}
	for(let i = 0; i < triangles.length; i++){
		let cshap = triangles[i];
		get_color(cshap[3]);
		triangle(cshap[0], cshap[1]-cshap[2]/2, cshap[0]-cshap[2]/2, cshap[1]+cshap[2]/2, cshap[0]+cshap[2]/2, cshap[1]+cshap[2]/2);
	}
}

function get_color(col_num){
	switch(col_num){
		case 0:
			fill(hue_slider.value(), sat_slider.value(), val_slider.value());
			break;
		case 1:
			fill((hue_slider.value()+(255*0.3))%256, sat_slider.value(), val_slider.value());
			break;
		case 2:
			fill((hue_slider.value()+(255*0.6))%256, sat_slider.value(), val_slider.value());
			break;
	}
}

function clear_shapes(){
	while(!circles.length == 0){
		circles.pop();
	}
	while(!squares.length == 0){
		squares.pop();
	}
	while(!trangles.length == 0){
		triangles.pop();
	}
}

function keyPressed(){
	switch(key){
		case '1':
			brush = "circle";
			break;
		case '2':
			brush = "square";
			break;
		case '3':
			brush = "triangle";
			break;

		case '4':
			color = 0;
			break;
		case '5':
			color = 1;
			break;
		case '6':
			color = 2;
			break;

		case 'c':
			clear_shapes();
			break;
	}

	let inc = 10;
	switch(keyCode){
		case LEFT_ARROW:
			brush_w -= inc;
			break;
		case RIGHT_ARROW:
			brush_w += inc;
			break;
	}
}

function mousePressed(){
	if(mouseButton === LEFT){
		switch(brush){
			case "circle":
				circles.push([mouseX, mouseY, brush_w, color]);
				break;
			case "square":
				squares.push([mouseX, mouseY, brush_w, color]);
				break;
			case "triangle":
				triangles.push([mouseX, mouseY, brush_w, color]);
				break;
		}
	}
}
