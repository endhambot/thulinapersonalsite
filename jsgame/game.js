const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = 25;
const canvasSize = 23;

let score = 0;

let snake = [];
snake [0] =
{
    x: Math.floor((canvasSize/2)) * box,
    y: Math.floor((canvasSize/2)) * box
}

let dir;
document.addEventListener('keydown', direction);

function direction(event){
    if(event.keyCode == 37 && dir != "RIGHT"){
        dir = "LEFT";
    }
    if(event.keyCode == 38 && dir != "DOWN"){
        dir = "UP";
    }
    if(event.keyCode == 39 && dir != "LEFT"){
        dir = "RIGHT";
    }
    if(event.keyCode == 40 && dir != "UP"){
        dir = "DOWN";
    }
}

let food = {
    x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
    y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box
}

function draw(){
    ctx.fillStyle = "silver";
    ctx.fillRect(box, box, canvasSize*box - box, canvasSize*box-box);
    for(let i = 0; i < snake.length; i++ )
    {
        ctx.fillStyle = 'blue';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(dir == "LEFT")
     snakeX -= box;
    if(dir == "RIGHT")
     snakeX += box;
    if(dir == "UP")
     snakeY -= box;
    if(dir == "DOWN")
     snakeY += box;

    if(snakeX == food.x && snakeY == food.y)
    {
        score+=1;
        food ={
            x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
            y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box
        }
    }
    else
    {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY

    };



    function collision(head, array){
        for(let i = 0; i < array.length; i++)
        {
            if(head.x == array[i].x && head.y == array[i].y)
            {
                return true;
            }
        }
        return false;
    }

    if(snakeX < box || snakeY < box ||
         snakeX > ((canvasSize - 1) * box) || snakeY > ((canvasSize - 1) * box) ||
         collision(newHead, snake))

    {
        clearInterval(game);
    }

    snake.unshift(newHead);

     ctx.fillStyle = "red";
     ctx.fillRect(food.x, food.y, box, box);

     ctx.fillStyle = "white";
     ctx.font = "24px changa one";
     ctx.clearRect(0, 0, 50, 25);
     ctx.fillText(score, box, 0.8 * box);

}
let game = setInterval(draw, 100);