const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas);

const width = 800
const height = 600

var raycastDivider = 16
var fov = 90
var mapSector = 0
const cellSize = 32

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

var sprint = 1

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

        ctx.fillStyle = 'black'
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 8, 0, 2 * Math.PI);
        ctx.fill()

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x, this.position.y - 20);
        
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
    rotation: toRadians(0)
})


function toRadians(deg) {
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
            if(sector == 1) 
            {
                ctx.fillStyle = "blue";
                ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
            }
            else if(sector == 2) 
            {
                ctx.fillStyle = "red";
                ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
            }
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
        case 'a':
            player.rotation -= toRadians(8)
            break
        case 'd':
            player.rotation += toRadians(8)
            break
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
        case 'a':
            player.rotation += toRadians(0)
            break
        case 'd':
            player.rotation += toRadians(0)
            break
        }
});

canvas.addEventListener("click", () => 
{
    canvas.requestPointerLock();
});

document.addEventListener("mousemove", function (event) 
{
    player.rotation += toRadians(event.movementX) / 16;
});