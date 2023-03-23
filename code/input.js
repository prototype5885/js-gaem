var sprint = 2
var speed = 2

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
            player.speed = 2
            player.direction = -degToRad(90)
            break
        case 'd':
            player.speed = 2
            player.direction = degToRad(90)
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
            player.speed = 0
            player.direction = 0
            break
        case 'd':
            player.speed = 0
            player.direction = 0
            break
        }
});

canvas.addEventListener("click", () => 
{
    canvas.requestPointerLock();
});

document.addEventListener("mousemove", function (event) 
{
    player.rotation += degToRad(event.movementX) / 8;
    if (player.rotation >= 2*Math.PI || player.rotation <= -2*Math.PI)
    {
        player.rotation = 0
    }

});