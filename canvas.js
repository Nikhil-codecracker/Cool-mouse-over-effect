var canvas=document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

// c.fillStyle="green";
// c.fillRect(100,100,100,100);
// c.fillRect(400,100,100,100);
//Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle ="red";
// c.stroke()
//Arc /Circle
// c.beginPath();
// c.arc(300,300,30,0,Math.PI*2,false);
// c.strokeStyle='blue';
// c.stroke();
// for(var i=0;i<50;i++)
// {
//     var x=Math.random();
//     var y=Math.random();
//     c.beginPath();
//     c.arc(x*window.innerWidth,y*window.innerHeight,30,0,Math.PI*2,false);
//     c.strokeStyle='blue';
//     c.stroke();
// }
var mouse={
    x:undefined,
    y:undefined
}
var maxRadius=40;
//var minRadius=2;
var colorArray=[
    '#009681',
    '#00806F',
    '#00FFDD',
    '#004037',
    '#00E6C7'
]

window.addEventListener('resize',function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
})

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})



function Circles(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color=colorArray[Math.floor(colorArray.length*Math.random())];;
    this.radius = radius;
    this.minradius=radius;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fillStyle=this.color;
        c.fill();
    };
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50){
            if(this.radius<maxRadius){
                this.radius+=1;
            }
        }
        else if(this.radius>this.minradius){
            this.radius-=1;
        }
        this.draw();
    };
}

var circleArray=[];

function init(){
    circleArray=[];
    for(var i=0;i<800;i++)
    {
        var radius=12*Math.random()+1;
        var x=Math.random()*(innerWidth-radius*2)+radius;
        var y=Math.random()*(innerHeight-radius*2)+radius;
        var dy=5*(2*Math.random()-1);
        var dx=5*(2*Math.random()-1);
        var r=256*Math.random();
        var t=Math.random()+0.3;

        circleArray.push(new Circles(x,y,dx,dy,radius,r,0,0,t));
    }

}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(var i=0;i<circleArray.length;i++)
    {
        circleArray[i].update();
    }
}

init();
animate();