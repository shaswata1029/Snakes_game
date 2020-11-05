function init(){
canvas=document.getElementById('mycanvas');
W=H=canvas.width=canvas.height=1000;

pen=canvas.getContext('2d');
pen.fillStyle="blue";
cs=66;
game_over=false;
score=0;

food_image = new Image();
food_image.src="assests/apple.png";

trophy=new Image();
trophy.src="assests/trophy.png"

food = getrandomfood();

snake={
	init_len:5,
	color:"blue",
	cells:[],
	direction:"right",

	createsnake:function(){
		for(var i=this.init_len;i>0;i--){
			this.cells.push({x:i,y:0});

		}
	},

	drawsnake:function(){
		for(var j=0;j<this.cells.length;j++){
		pen.fillRect(this.cells[j].x*cs,this.cells[j].y*cs,cs-3,cs-3);
	}

},

updatesnake:function(){
var headX=this.cells[0].x;
var headY=this.cells[0].y;

if(headX==food.x && headY==food.y)
{
	console.log("food eaten by snake");
	food=getrandomfood();
	score++;
}
else{
this.cells.pop();
}
var nextX,nextY;
if(this.direction=="right"){
nextX=headX+1;
nextY=headY;
}

else if(this.direction=="up"){
nextX=headX;
nextY=headY-1;
}
else if(this.direction=="down"){
nextX=headX;
nextY=headY+1;
}
else{
	nextX=headX-1;
	nextY=headY;
}

this.cells.unshift({x:nextX,y:nextY});

var last_x=Math.round(W/cs);
var last_y=Math.round(H/cs);

if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y ){
	game_over=true;
}


}

};

snake.createsnake();

function keypressed(e){
	console.log(e.key);
	if(e.key=="ArrowRight")
		snake.direction="right";
	else if (e.key=="ArrowLeft")
		snake.direction="left";
	else if(e.key=="ArrowDown")
		snake.direction="down";
	else if(e.key=="ArrowUp")
		snake.direction="up";

	
}

document.addEventListener('keydown',keypressed);

}



function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawsnake();
	pen.fillStyle=food.color;
	pen.drawImage(food_image,food.x*cs,food.y*cs,cs,cs);
	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle="black";
	pen.font="25px Roboto";
	pen.fillText(score,50,50);
	pen.fillStyle="blue";
}

function update(){
snake.updatesnake();

}

function getrandomfood(){
	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);

	var food= {
		x:foodX,
		y:foodY,
		color:"red",
	};

return food;
}

function gameloop(){

	if(game_over==true){
		clearInterval(f);
		alert("Game Over \nTry again ");
		return;
	}

	draw();
	update();

}

init();
var f=setInterval(gameloop,150);


