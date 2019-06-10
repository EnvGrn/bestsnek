const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";

var score = 0;

var snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// Skapar maten
var food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Kontrollerar snake
var d;
document.addEventListener("keydown",direction);
function direction(event){
    var key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

// Kollar ifall snake huvudet nudar sin kropp eller någon av kanterna
function collision(head,array){
    for(var i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Ritar ner allt på canvasen som marken och maten samt självaste snake
function draw(){
    ctx.drawImage(ground,0,0);
    ctx.drawImage(foodImg, food.x, food.y);

    for( var i = 0; i < snake.length ; i++){
        // Gör så att huvudet är grönt då i == 0 och ifall det inte är sant så blir kroppen då vit
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    // gammal position för snake huvudet
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // Vilket håll snake går mot
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    //Ifall snake äter maten så ge score och skapar ny mat
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // Lägger till ett nytt huvud utan att ta bort svansen
    }
    else{
        // Tar bort svansen i snake arrayen
        snake.pop();
    }

    //Gör nytt huvud till snake
    var newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
    }

    // Lägger till newHead positionen in i snake arrayen
    snake.unshift(newHead);

    // Score
    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score,2*box,1.6*box);
}

var game = setInterval(draw,100);
