
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = '#00ffff';
ctx.lineWidth = 5;
ctx.shadowBlur= 0;
ctx.shadowColor = '#00ffff'

function degToRad(degree){
    var factor = Math.PI/180;
    return degree*factor;
}

function renderTime(){
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    var smoothsec = sec+(mil/1000);
    var smoothmin = min+(smoothsec/60);

    //Background
    gradient = ctx.createRadialGradient(100, 100, 5, 100, 100, 100);
    gradient.addColorStop(0, "#5c5c5c");
    gradient.addColorStop(1, "#5c5c5c");
    ctx.fillStyle = gradient;
    //ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
    ctx.fillRect(0, 0, 200, 200);
    //Hours
    ctx.beginPath();
    ctx.arc(100,100,90, degToRad(270), degToRad((hrs*30)-90));
    ctx.stroke();
    //Minutes
    ctx.beginPath();
    ctx.arc(100,100,80, degToRad(270), degToRad((smoothmin*6)-90));
    ctx.stroke();
    //Seconds
    ctx.beginPath();
    ctx.arc(100,100,70, degToRad(270), degToRad((smoothsec*6)-90));
    ctx.stroke();
    //Date
    ctx.font = "12px Helvetica";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)'
    ctx.fillText(today, 60, 95);
    //Time
    ctx.font = "12px Helvetica Bold";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)';
    ctx.fillText(time+":"+mil, 75, 115);

}
setInterval(renderTime, 40);