var wall = []

var raycastDivider = 20
var raycastAmount = width / raycastDivider

for (var i = 0; i < width/raycastDivider; i++) 
{
    wall[i] = new Wall({position: 0, length: getRndInteger(100, 300), width: width/raycastAmount})
}

function drawBackground()
{
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height/2);
    
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
}


function drawWalls()
{
    wall.forEach((wall, pos) =>
    {
        wall.update(500, pos)
        // console.log(wall)
    })
}
console.log(wall)
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
                ctx.fillStyle = "cyan";
            }
            // ctx.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
            ctx.fillRect(cellSize * x, cellSize * y, cellSize-1, cellSize-1);
        })
    });
}