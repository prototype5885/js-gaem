class Actor {
    constructor({position, speed, rotation, direction})
    {
        this.position = position
        this.speed = speed
        this.rotation = rotation
        this.direction = direction
    }
    draw()
    {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, 6, 0, 2 * Math.PI)
        ctx.fill()

        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.moveTo(this.position.x, this.position.y)
        let lineLength = 20
        ctx.lineTo(this.position.x + Math.cos(this.rotation)*lineLength, this.position.y + Math.sin(this.rotation)*lineLength)
        ctx.stroke()
    }
    update(draw)
    {
        if (draw){this.draw()}
        this.position.x += Math.cos(this.rotation + this.direction) * this.speed
        this.position.y += Math.sin(this.rotation + this.direction) * this.speed
    }
}

class Wall {
    constructor({position, length, width, color})
    {
        this.position = position
        this.length = length
        this.width = width
        this.color = color
    }
    draw()
    {
        ctx.fillStyle = 'black'
        ctx.rect(this.position, height/2-this.length/2, this.width, this.length)
        ctx.fill()
    }
    update(lgth, pos)
    {
        // this.length = lgth
        this.position = pos * this.width
        this.draw()
    }
}

class RayCast {
    constructor({direction, length})
    {
        this.direction = direction
        this.length = length
    }
    draw()
    {
        ctx.strokeStyle = 'red'
        ctx.beginPath();
        ctx.moveTo(player.position.x, player.position.y);
        ctx.lineTo(player.position.x + Math.cos(player.rotation)*this.length, player.position.y + Math.sin(player.rotation)*this.length);
        ctx.stroke();
    }
    update()
    {
        this.draw()
    }
}