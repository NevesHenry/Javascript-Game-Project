// Bullethell Game Project!!
 
 "use strict"

 let score = 0;
 let ctx;
 const CANVAS_WIDTH = 600;
 const CANVAS_HEIGHT = 800;
 let bossCount;

 function setup() 
{
	ctx = document.getElementById("surface").getContext("2d");
}


function start()
{
        addEnemy();
        draw()
        document.getElementById('loadPage').style.cssText = 'visibility: hidden';
        document.getElementById('surface').style.cssText = 'visibility: visible;margin-right: 700px';
    
}

function draw()
{
    ctx.clearRect(0, 0, CANVAS_WIDTH,CANVAS_HEIGHT);

    background();
    updateSpaceship();
    if(bossCount == 1){
        for(let i=0;i<bossShot2Array.length;i++){
            bossShot2Array[i].update();
        }
        drawBoss();
    }
    
    for(let i=0;i<enemyArray.length;i++)
    {
        enemyArray[i].update();
    }

    for(let j=0;j<enemyShotArray.length;j++)
    {
        enemyShotArray[j].update();
    }
       // PLAYER
    drawSpaceship(spaceship.position.x,spaceship.position.y,spaceship.rotate);
    
    for(let i=0;i<shotArray.length;i++){
        shotArray[i].update();
    }
    
    requestAnimationFrame(draw);
}


let backgroundY = 800;
function background()
{
    let base_image = new Image();
    base_image.src = 'game_Images/background1.jpg';
    ctx.drawImage(base_image,100,backgroundY,600,275,0,0,600,800)
    if(backgroundY<=100){
        backgroundY=800
    }
    backgroundY--
}

var boss = 
{
    width: 200,
    height: 350,
    health: 500,
    position:
    {
        x: 100,
        y: -400,
    }
}


var spaceship =
{
    health:100,
    width: 72,
    height: 72,
    position:
    {
        x: 300,
        y: 700,
    },
    velocity:
    {
        x: 0,
        y: 0
    },
    rotate: 0,

    engine:
    {
    	forward: false,
    	left: false,
    	right: false,
    	backwards: false,
    }
}


function EnemyCreator(x,y,dx,dy,width,height,health,enemyType)
{
    this.x = x;
    this.y = y; 
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.health = health;
    this.enemyType = enemyType;
    this.enemyStatus = true;

    this.drawEnemy = function()
    {
        ctx.save();
        ctx.translate(this.x,this.y);


        let enemy2 = new Image();
        enemy2.src = 'game_Images/enemy'+ enemyType + '.png'
        ctx.drawImage(enemy2,0,0,this.width,this.height);
        ctx.restore();
    } 
    this.update = function()
    {
        if (this.x >= (CANVAS_WIDTH-50)) {
            this.x = CANVAS_WIDTH -50;
            this.dx *= -1.5;
        }
        if (this.x <= 0) {
            this.x = 0;
            this.dx *= -0.5;
        }   
        
        this.x += this.dx;
        this.y += this.dy;
        
        if (this.y >= CANVAS_HEIGHT-350) 
        {
            this.y = CANVAS_HEIGHT-350;
            this.dy *= -1.5;   
        } 
        else  if (this.y <= 0) 
        {
            this.y = 0;
            this.dy *= -0.5;
        }
       
        this.drawEnemy(); 
    }
}

let enemyArray = [];

function addEnemy()
{
    for(let i=0;i<5;i++)
    {
        let y = Math.floor(Math.random() * (1+60-i)) + i;
        let dx = 1;
        let dy = 1;
        let width = 50;
        let height = 75;
        let health = 3;
        let enemyType = Math.floor(Math.random()*5 +1);
        let x = 50 + (60*i) ;
        enemyArray.push(new EnemyCreator(x,y,dx,dy,width,height,health,enemyType))
    }
}

function drawSpaceship(x,y,rotate)
{
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(spaceship.rotate);

    let player = new Image();
    player.src = 'game_Images/player.png';
    ctx.drawImage(player,0,0,spaceship.width,spaceship.height);
    ctx.fillStyle = "green";
    ctx.fillRect(-15,80,spaceship.health,5);
    ctx.restore();
}

function updateSpaceship()
{
    if(spaceship.engine.right)
    {
        spaceship.position.x += 5;
            if(spaceship.position.x >= CANVAS_WIDTH - spaceship.width){
                spaceship.position.x = CANVAS_WIDTH - spaceship.width;
            }
    }
    if(spaceship.engine.left)
    {
        spaceship.position.x -= 5;
        if(spaceship.position.x <= 0)
        {
            spaceship.position.x = 5
        }
    }
    if(spaceship.engine.forward)
    {
        spaceship.position.y -= 5;
        if(spaceship.position.y <= 0)
        {
            spaceship.position.y = 5
        }
        
    }
    if(spaceship.engine.backwards)
    {
    	spaceship.position.y += 5;
        if(spaceship.position.y >= CANVAS_HEIGHT - spaceship.height)
        {
            spaceship.position.y = CANVAS_HEIGHT - spaceship.height;
        }

    }
    for(let j=0;j<bossShot2Array.length;j++)
    {
        if(win)
        {continue;}
        else
        {
            if(distance(bossShot2Array[j].x,spaceship.position.x + spaceship.width*0.2,bossShot2Array[j].y,spaceship.position.y) < 30)
            {
                spaceship.health -= 3;
                bossShot2Array[j].x = 1000;
                console.log('You were hit');
                if(spaceship.health <= 0){
                    document.getElementById('surface').style.cssText = 'visibility: hidden;';
                    document.getElementById('loadPage').style.cssText = 'visibility: visible;';
                    document.getElementById('title').innerHTML = 'GAME OVER';
                    document.getElementById('start').innerHTML = 'RETRY';
                }
            }
        }
    }

    
   	
}

function keyLetGo(event)
{
    switch(event.keyCode)
    {
        case 37: // Left Arrow key
        case 65: // 'a' key
            spaceship.engine.left = false;
            break;
        case 39: // Right Arrow key
        case 68: // 'd' key
            spaceship.engine.right = false;
            break;
        case 38: // Up Arrow key
        case 87: // 'w' key
            spaceship.engine.forward = false;
            break;
        case 40: // Down Arrow key
        case 83: // 's' key
        	spaceship.engine.backwards = false;
    }
}

document.addEventListener('keyup', keyLetGo);

function keyPressed(event)
{
    switch(event.keyCode)
    {
        case 37: // Left Arrow key
        case 65: // 'a' key
            spaceship.engine.left = true;
            break;
        case 39: // Right Arrow key
        case 68: // 'd' key
            spaceship.engine.right = true;
            break;
        case 38: // Up Arrow key
        case 87: // 'w' key
            spaceship.engine.forward = true;
            break;
        case 40: // Down Arrow key
        case 83: // 's' key
        	spaceship.engine.backwards = true;
    }
}

document.addEventListener('keydown', keyPressed);

let shotArray = [];  // player shot

let enemyShotArray = [];

function CreateEnemyShot(x,y,dx,dy,width,height)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.draw = function()
    {
        ctx.save();
        ctx.translate(this.x,this.y);

        let shot = new Image();
        shot.src = 'game_Images/enemyShot.png';
        ctx.drawImage(shot,0,0,this.width,this.height);
        ctx.restore();
    }
    this.update = function()
    {
        this.y += dy;

        if(enemyArray.length !== 0)
        {
            for(let i=0;i<enemyShotArray.length;i++)
            {
                if(enemyShotArray[i].x > CANVAS_WIDTH || enemyShotArray[i].x < 0 || enemyShotArray[i].y >CANVAS_HEIGHT || enemyShotArray[i].y < 0)
                {
                    enemyShotArray.splice(i,1);
                    i--;
                }     
            } 
        }
        this.draw();
    }
}

function addEnemyShot() 
{
    if(enemyArray.length !== 0)
    {
        let randomPos = Math.floor(Math.random()*enemyArray.length);
        let x = enemyArray[randomPos].x;
        let y = enemyArray[randomPos].y + enemyArray[randomPos].height/2;
        let dx = 1;
        let dy = 5;
        let width = 50;
        let height = 75;

        enemyShotArray.push(new CreateEnemyShot(x,y,dx,dy,width,height));
    }
    for(let j=0;j<enemyShotArray.length;j++)
    {
        if(win)
        {continue;}
        else
        {
            if(distance(enemyShotArray[j].x,(spaceship.position.x+spaceship.width*0.01),enemyShotArray[j].y,spaceship.position.y) < 60)
            {
                spaceship.health -= 1;
                enemyShotArray[j].x = 1000;
                console.log('You are hit');
                if(spaceship.health <= 0)
                {
                    document.getElementById('surface').style.cssText = 'visibility: hidden;';
                    document.getElementById('start').style.cssText = 'visibility: hidden;';
                    document.getElementById('loadPage').style.cssText = 'visibility: visible;';
                    document.getElementById('gameOver').style.cssText = 'visibility: visible;';
                    document.getElementById('title').innerHTML = 'GAME OVER';  
                }
            }
        }   
        
    }
}

setInterval(addEnemyShot,250)

function BossShot2Constructor(x,y,dx,dy,width,height)
{
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.width = width;
   this.height = height;
   this.draw = function()
    {  
        ctx.save();
        ctx.translate(this.x,this.y);
        let tg = this.dx/this.dy;
        ctx.rotate(-Math.atan(tg));
		
		let shot2 = new Image();
        shot2.src = 'game_Images/enemyShot.png';
        ctx.drawImage(shot2,0,0,this.width,this.height);
        ctx.restore();
    }
    this.update = function()
    {
        this.x += this.dx;
        this.y += this.dy;

        if(bossShot2Array.length !== 0)
        {
            for(let i=0;i<bossShot2Array.length;i++)
            {
                if(bossShot2Array[i].x > CANVAS_WIDTH || bossShot2Array[i].x < 0 || bossShot2Array[i].y >CANVAS_HEIGHT || bossShot2Array[i].y < 0)
                {
                    bossShot2Array.splice(i,1);
                    i--;
                }     
            } 
        }
        this.draw();
    }
}
let bossShot2Array = [];

function bossShot2()
{
    if(bossCount == 1)
    {
        let x = boss.position.x + boss.width - 22;
        let y = boss.position.y + boss.height/2;
        let dx = Math.random()*10 - 5;
        let dy = 3;
        let width = 50;
        let height = 75;

        bossShot2Array.push(new BossShot2Constructor(x,y,dx,dy,width,height));
    }
}

setInterval(bossShot2,70);

let enemyDeath = 0;
let win = false;

function Shot(x,y,dx,dy,angle) 
{
    this.width = 22;
    this.height = 22;
    this.x = spaceship.position.x + spaceship.width/2;
    this.y = spaceship.position.y;
    this.dx = dx;
    this.dy = dy;
    this.angle = angle;

    this.drawShot = function()
    {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);

        let playerShot = new Image();
        playerShot.src = 'game_Images/playerFire.png';
        ctx.drawImage(playerShot,0,0,this.width,this.height);

        ctx.restore();
    }
    this.update = function()
    {
        this.x+= this.dx;
        this.y+=this.dy;

        for(let j=0;j<enemyArray.length;j++)
        {

            if(distance(enemyArray[j].x + enemyArray[j].width*.001,this.x,enemyArray[j].y + enemyArray[j].height*.001,this.y)<100)
            {
                console.log("hit")
                score += 50;
                document.getElementById("score").innerHTML = score;
                enemyArray[j].health -= 1;
                this.x = 1000;

                if(enemyArray[j].health == 0)
                {
                    enemyArray.splice(j,1);
                    j--;
                }
                if(enemyArray.length == 0)
                {
                    addEnemy();
                    console.log("All enemies down.");
                    score += 100;
                    document.getElementById("score").innerHTML = score;
                    enemyDeath += 1
                }
                if (enemyDeath == 5){
                    bossCount = 1;
                }
            }
        }
        for(let i=0;i<shotArray.length;i++)
        {
            if(bossCount==1)
            {
                if(distance(boss.position.x+boss.width*0.9, this.x,boss.position.y+boss.height*0.7,this.y)<110)
                {
                    console.log("Boss hit");
                    score += 100;
                    document.getElementById("score").innerHTML = score;
                    this.x = 1000;
                    boss.health -= 7;
                    if(boss.health <= 0){
                        win = true;

                        document.getElementById('surface').style.cssText = 'visibility: hidden;';
                        document.getElementById('start').style.cssText = 'visibility: hidden;';
                        document.getElementById('loadPage').style.cssText = 'visibility: visible;';
                        document.getElementById('gameOver').style.cssText = 'visibility: visible;';
                        document.getElementById('finalScore').style.cssText = 'visibility: visible;';
                        document.getElementById('finalScore').innerHTML = 'Your final score is: ' + score;
                        document.getElementById('gameOver').innerHTML = 'New Game';
                        document.getElementById('title').innerHTML = 'You Win!';
                    }
                }
            }
    
            if(shotArray[i].x > CANVAS_WIDTH || shotArray[i].x < 0 || shotArray[i].y > CANVAS_HEIGHT || shotArray[i].y < 0)
            {
                shotArray.splice(i,1);
                i--;
            }
        }
        
        this.drawShot();
    }
}

function rotation(xFrom, yFrom, xTo, yTo) 
{
    return Math.atan((yTo-yFrom) / (xTo - xFrom)) + (xTo < xFrom ?Math.PI:0);
}

let mouse = {x:undefined,y:undefined};

function onClickEvent(event)
{
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;  
    let angle = rotation(spaceship.position.x + spaceship.width/2,spaceship.position.y,mouse.x,mouse.y);
    let dx = Math.cos(angle) * 5;
    let dy = Math.sin(angle) * 5;
    shotArray.push(new Shot(mouse.x,mouse.y,dx,dy,angle));
}

function distance(x1,x2,y1,y2){
    let xDist = (x2-x1)**2;
    let yDist = (y2-y1)**2;
    return Math.sqrt(xDist + yDist);
}

function drawBoss()
{
    let bossImg = new Image();
    bossImg.src = "game_Images/Boss.png";
    ctx.save();
    ctx.drawImage(bossImg,boss.position.x,boss.position.y,400,400);
    ctx.drawImage(bossImg,boss.position.x,boss.position.y,400,400);
    ctx.fillStyle = "red";
    ctx.fillRect((boss.position.x - 50),(boss.position.y-20),boss.health,10);
    boss.position.y++;
    if(boss.position.y >= 40)
    {
        boss.position.y = 40;
    }
}