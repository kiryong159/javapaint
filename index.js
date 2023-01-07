const eraseBtn = document.querySelector(".eraser-btn");
const modeBtn = document.querySelector(".mode-btn");
const destroyBtn = document.querySelector(".destroy-btn");
const colorOption = Array.from(document.querySelectorAll(".color-option"));
const lineWidthh = document.querySelector(".line-width");
const colors = document.querySelector(".color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidthh.value;
let nowpainting = false;
let Filling = false;

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

function modeclick() {
  if (Filling) {
    Filling = false;
    modeBtn.innerText = "NOW DORW MODE";
  } else {
    Filling = true;
    modeBtn.innerText = "NOW FILL MODE";
  }
}

function filldrow() {
  if (Filling) {
    ctx.fillRect(0, 0, 800, 800);
  }
}

function destroy() {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
  ctx.beginPath();
}

function eraserrr() {
  ctx.strokeStyle = "white";
  Filling = false;
  modeBtn.innerText = "NOW DORW MODE";
}

canvas.addEventListener("click", filldrow);
canvas.addEventListener("mousemove", movemouse);
canvas.addEventListener("mousedown", startpaint);
document.addEventListener("mouseup", canclepaint);
canvas.addEventListener("mouseleave", canclepaint);

lineWidthh.addEventListener("change", linewidthhh);
colors.addEventListener("change", colorchan);

colorOption.forEach((color) => color.addEventListener("click", changecolor));
modeBtn.addEventListener("click", modeclick);
destroyBtn.addEventListener("click", destroy);
eraseBtn.addEventListener("click", eraserrr);
