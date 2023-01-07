const colorOption = Array.from(document.querySelectorAll(".color-option"));
const lineWidthh = document.querySelector(".line-width");
const colors = document.querySelector(".color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 5;
let nowpainting = false;

function movemouse(event) {
  if (nowpainting === true) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startpaint() {
  nowpainting = true;
}
function canclepaint() {
  nowpainting = false;
  ctx.beginPath();
}

function linewidthhh(event) {
  ctx.lineWidth = event.target.value;
}

function colorchan(event) {
  ctx.strokeStyle = ctx.fillStyle = event.target.value;
}

function changecolor(event) {
  ctx.strokeStyle = ctx.fillStyle = colors.value = event.target.dataset.color;
}

function strokefill() {}

canvas.addEventListener("mousemove", movemouse);
canvas.addEventListener("mousedown", startpaint);
document.addEventListener("mouseup", canclepaint);
canvas.addEventListener("mouseleave", canclepaint);

lineWidthh.addEventListener("change", linewidthhh);
colors.addEventListener("change", colorchan);

colorOption.forEach((color) => color.addEventListener("click", changecolor));
