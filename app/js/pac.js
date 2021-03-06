
function Pac(){
    this.x = 0 * w + w / 2
    this.y = w/2
    this.aniX = this.x
    this.aniY = this.y
    this.alive = true
    this.direction = ""
    this.lastDirection = ""
    this.keyIsPressed = false;
    this.tail = false
    this.flying = false
    this.aniSpeed = 4
    this.prevX = w / 2
    this.prevY = w / 2
    this.r = 9

    this.move = function(input) {

                switch (this.direction) {
                    case 'down': if(this.y<(cols*w)-w && this.aniY % this.y === 0 && this.aniX % this.x === 0){
                        this.prevX = this.x
                        this.prevY = this.y
                        this.y = this.y + w;

                    }
                        break;
                    case 'up': if(this.y>w/2 && this.aniY % this.y === 0 && this.aniX % this.x === 0){
                        this.prevX = this.x
                        this.prevY = this.y
                        this.y = this.y - w;
                    }
                        break;
                    case 'right': if (this.x<(rows*w)-w && this.aniX % this.x === 0 && this.aniY % this.y === 0) {
                        this.prevY = this.y
                        this.prevX = this.x
                        this.x = this.x + w;
                    }
                        break;
                    case 'left': if(this.x>w/2 && this.aniX % this.x === 0 && this.aniY % this.y === 0){
                        this.prevY = this.y
                        this.prevX = this.x
                        this.x = this.x - w;
                    }
                    break;
            }

    }
    this.moveAni = function(input) {

        if (this.direction === "down" && this.aniY<(cols*w)-w && this.y > this.aniY || this.y > this.aniY){
            this.aniY = this.aniY + this.aniSpeed
            return
        }
        else if (this.direction === "up" && this.y>w/2 && this.y < this.aniY || this.y < this.aniY){
            this.aniY = this.aniY - this.aniSpeed
            return
        }
        else if (this.direction === "right" && this.aniX<(rows*w)-w && this.x > this.aniX || this.x > this.aniX){
            this.aniX = this.aniX + this.aniSpeed
            return
        }
        else if (this.direction === "left" && this.aniX>w/2 && this.x < this.aniX || this.x < this.aniX){
                this.aniX = this.aniX - this.aniSpeed
            return
        }

    }

}

Pac.prototype.show = function(){
    noStroke()
    fill(255,255,0)
    ellipseMode(CENTER);
    ellipse(this.aniX, this.aniY, this.r*2, this.r*2)
}





Pac.prototype.take = function(){
        for (let i = 0; i<rows;i++){
            for (let j = 0; j<cols;j++){
                if(pacman.x-w/2 === grid[i][j].x && pacman.y-w/2 === grid[i][j].y && grid[i][j].on === false){
                    pacman.flying = true;
                }


                if(pacman.prevX-w/2 === grid[i][j].x && pacman.prevY-w/2 === grid[i][j].y && grid[i][j].on === false && grid[i][j].tail === false && pacman.flying === true){
                    grid[i][j].tail = true
                    tail.arr.push(new TailCell(i,j))
                    initLineChecks()

            }
        }
    }

    for (let i = 0; i<rows;i++){
        for (let j = 0; j<cols;j++){
            if(pacman.x-w/2 === grid[i][j].x && pacman.y-w/2 === grid[i][j].y && grid[i][j].on === true && pacman.flying){

                for (let k = 0; k<tail.arr.length;k++){
                    grid[tail.arr[k].x][tail.arr[k].y].on = true
                }

                checkFlood()
                tail.arr = []
                tail.waveInitArr = []
                emptyRoute()
                initLineChecks()
                pacman.flying = false;
                if (!this.keyIsPressed){
                    pacman.direction=""
                }
            }
        }
    }


    for (let i = 0; i < tail.arr.length - 1;i++){
        if (tail.arr[i].x === (pacman.x-w/2) /w && tail.arr[i].y === (pacman.y-w/2) /w){
            die()
        }
    }
}



function keyPressed() {
    if (keyCode === RIGHT_ARROW){
        if(pacman.flying && pacman.direction === "left") {

        }else {
            this.keyIsPressed = true;
            pacman.direction = "right"
            pacman.lastDirection = pacman.direction
        }

    }
    else if (keyCode === LEFT_ARROW){
        if(pacman.flying && pacman.direction === "right") {

        }else{
            this.keyIsPressed = true;

            pacman.direction = "left"
            pacman.lastDirection = pacman.direction
        }
    }
    else if (keyCode === UP_ARROW){
        if(pacman.flying && pacman.direction==="down"){

        }else{
            this.keyIsPressed = true;

            pacman.direction = "up"
            pacman.lastDirection = pacman.direction

        }
    }
    else if (keyCode === DOWN_ARROW){
        if(pacman.flying && pacman.direction === "up"){

        }else{
            this.keyIsPressed = true

            pacman.direction = "down"
            pacman.lastDirection = pacman.direction

        }
    }
}

function keyReleased() {
    if (pacman.direction==="right" && keyCode===RIGHT_ARROW && !pacman.flying){
        this.keyIsPressed=false

        pacman.direction = ""

    }
    else if (pacman.direction==="left" && keyCode===LEFT_ARROW && !pacman.flying){
        this.keyIsPressed=false

        pacman.direction=""

    }
    else if (pacman.direction==="up" && keyCode===UP_ARROW && !pacman.flying){
        this.keyIsPressed=false

        pacman.direction=""

    }
    else if (pacman.direction==="down" && keyCode===DOWN_ARROW && !pacman.flying){
        this.keyIsPressed=false

        pacman.direction=""
    }
}
