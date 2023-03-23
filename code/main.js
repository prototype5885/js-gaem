const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas);

const width = 1280
const height = 720

var raycastDivider = 16
var fov = 90

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

function degToRad(deg) 
{
    return (deg * Math.PI) / 180;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function gameLoop() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground()
    // drawMap()
    drawWalls()
    rays()
    player.update(true)
}

setInterval(gameLoop, 1000/60);

