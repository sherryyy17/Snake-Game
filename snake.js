function init(){
    document.getElementById('dis').innerHTML = "";
    window.canvas = document.getElementById('myCanvas');
    window.W = canvas.width = 960;
    window.h = canvas.height = 960;
    window.pen = canvas.getContext('2d');
    window.direction = "right";
    window.cs= 80;
    window.score = 0;

    food_img =  new Image();
    food_img.src = 'assets/rats.png';
    trophy = new Image();
    trophy.src = 'assets/trophy.png';

    food = getRandomFood();
    snake = {
        init_len : 5,
        color : "black",
        cells : [] ,
        
        createSnake:function(){

            for(var i = this.init_len; i>0; i--)
            {
                this.cells.push({x:i,y:0});
            }

        },
        drawSnake:function(){

            for(var i = 0; i<this.cells.length; i++)
            {   
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }

        },
        updateSnake:function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y)
            {
                food = getRandomFood();
                score++;
                
            }
            else
            {   
                this.cells.pop();
            }

            var X,Y;

            if((headX>=0&&headX<=12)&&(headY>=0&&headY<=12))
            {
                if(direction=='right')
                {
                X = headX + 1;
                Y = headY;
                }
                else if(direction=='left')
                {
                X = headX - 1;
                Y = headY;
                }
                else if(direction=='down')
                {
                X = headX;
                Y = headY + 1;
                }
                else
                {
                    X = headX;
                    Y = headY - 1;
                }
                this.cells.unshift({x:X,y:Y});
            }
            else
            {
                clearInterval(f);
                alert('Game Over');
            }

        }
    };
    snake.createSnake();
    
    document.onkeydown = keyPressed;
    
    function keyPressed(e){
        console.log("key pressed",e.key);
        if(e.key == "ArrowRight")
        {
            direction = "right";
        }
        else if(e.key == "ArrowLeft")
        {
            direction = "left";
        }
        else if(e.key == "ArrowDown")
        {
            direction = "down";
        }
        else{
            direction = "up";
        }
    }

}
function draw(){
    pen.clearRect(0,0,W,h);
    snake.drawSnake();

    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs+10,cs+10);

    pen.font = "15px Roboto";
    pen.fillText(score,58,50);

}
function update(){
    snake.updateSnake();
}
function getRandomFood(){

    FoodX = Math.round(Math.random()*(W-cs)/cs);
    FoodY = Math.round(Math.random()*(h-cs)/cs);
    var food = {
        x: FoodX,
        y: FoodY,
        color : "black",

    }
    return food;
}

function gameloop(){
    draw();
    update();
}
var f = setInterval(gameloop,100);
