var canvas = document.getElementById('draw');
var ctx = canvas.getContext('2d');
var convertBtn = document.getElementById('convert');

var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);


ctx.lineWidth = 8;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';


canvas.addEventListener('mousedown', function(e) {
  ctx.beginPath();
  ctx.moveTo(mouse.x, mouse.y);

  canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
};
function canvasClr () {
  ctx.clearRect(0,0, canvas.width, canvas.height);    //This function clears the whole canvas area
}
function small(){
  ctx.lineWidth = 2;
  ctx.globalCompositeOperation="source-over"
}
function normal(){
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 8;
  ctx.globalCompositeOperation="source-over"
}
function large(){
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 16;
  ctx.globalCompositeOperation="source-over"
}
function eraser(){
  ctx.lineWidth = 8;
  ctx.globalCompositeOperation="destination-out";
}


// Converts canvas to an image
function convertCanvasToImage() {
  var image = document.getElementById('canvasImg');
  image.src = canvas.toDataURL();
  return image;
}
convertBtn.addEventListener('click',convertCanvasToImage);
