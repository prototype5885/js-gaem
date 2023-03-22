const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas);

const width = 1280
const height = 720

var raycastDivider = 16
var fov = 90
var mapSector = 0
const cellSize = 32

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

var sprint = 1

var pdx = Math.cos(degToRad(90));
var pdy = -Math.sin(degToRad(90));

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

class Sprite {
    constructor({position, speed, rotation})
    {
        this.position = position
        this.speed = speed
        this.rotation = rotation
    }
    draw()
    {
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 6, 0, 2 * Math.PI);
        ctx.fill()

        ctx.strokeStyle = 'white'
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + Math.cos(this.rotation)*15, this.position.y + Math.sin(this.rotation)*15);
        
        ctx.stroke();
    }
    update(){
        
        this.draw()
        this.position.x += Math.cos(this.rotation) * this.speed
        this.position.y += Math.sin(this.rotation) * this.speed;
    }
}

const player = new Sprite({
    position:
    {
        x: 256,
        y: 256
    },
    speed: 0,
    rotation: degToRad(0)
})

function degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

function drawBackground()
{
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);
    
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
}

function drawMap()
{
    map.forEach((vertical, y) => 
    {
        vertical.forEach((sector, x) =>
        {
            if(sector == 0)
            {
                ctx.fillStyle = "black";
            }
            if(sector == 1) 
            {
                ctx.fillStyle = "blue";
            }
            if(sector == 2) 
            {
                ctx.fillStyle = "red";
            }
            ctx.fillRect(cellSize * x, cellSize * y, cellSize-1, cellSize-1);
        })
    });
}

function drawWalls()
{
    ctx.fillStyle = 'blue'
    ctx.rect(0, height/2-75, 30, 150)
    ctx.fill()
}
// function clear()
// {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

function gameLoop() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground()
    // drawWalls()
    drawMap()
    player.update()


}


setInterval(gameLoop, 16,66666666666667);

document.addEventListener("keydown", (event) => 
{
    switch (event.key)
    {
        case 'w':
            player.speed = 2
            break
        case 's':
            player.speed = -2
            break
        // case 'a':
        //     player.rotation -= degToRad(15)
        //     break
        // case 'd':
        //     player.rotation += degToRad(15)
        //     break
    }
  });

  document.addEventListener("keyup", (event) => 
  {
    switch (event.key)
        {
        case 'w':
            player.speed = 0
            break
        case 's':
            player.speed = 0
            break
        // case 'a':
        //     player.rotation += toRadians(0)
        //     break
        // case 'd':
        //     player.rotation += toRadians(0)
        //     break
        }
});

canvas.addEventListener("click", () => 
{
    canvas.requestPointerLock();
});

document.addEventListener("mousemove", function (event) 
{
    player.rotation += degToRad(event.movementX) / 8;
    console.log(player.rotation);
});