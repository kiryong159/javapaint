const inputfile = document.querySelector(".file");
const savebtn = document.querySelector(".saveimg");
const inputtext = document.getElementById("text");
const eraseBtn = document.querySelector(".eraser-btn");
const modeBtn = document.querySelector(".mode-btn");
const destroyBtn = document.querySelector(".destroy-btn");
const colorOption = Array.from(document.querySelectorAll(".color-option"));
const lineWidthh = document.querySelector(".line-width");
const colors = document.querySelector(".color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const inputfont = document.getElementById("fontsize");
const fillfontbtn = document.querySelector(".fillfont");

canvas.width = 800;
canvas.height = 800;
ctx.font = `${inputfont.value}px serif`;
ctx.lineWidth = lineWidthh.value;
ctx.lineCap = "round";
let fillfont = false;
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

function uploadfile(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const upimg = new Image();
  upimg.src = url;
  upimg.onload = function () {
    ctx.drawImage(upimg, 0, 0, 800, 800);
  };
}

function dbclick(event) {
  const text = inputtext.value;
  if (text !== "") {
    if (fillfont === false) {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeText(text, event.offsetX, event.offsetY);
      ctx.restore();
    } else {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.fillText(text, event.offsetX, event.offsetY);
      ctx.restore();
    }
  }
}

function fontsizechange(event) {
  const fontsize = event.target.value;
  ctx.font = `${fontsize}px serif`;
}

function saveimg() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "mydraw.jpg";
  a.click();
}

function fillfontclick() {
  if (fillfont === false) {
    fillfont = true;
    fillfontbtn.innerText = "현재 글씨 채우기 모드";
  } else {
    fillfont = false;
    fillfontbtn.innerText = "현재 글씨 stroke 모드";
  }
}

fillfontbtn.addEventListener("click", fillfontclick);
inputfont.addEventListener("change", fontsizechange);
canvas.addEventListener("dblclick", dbclick);
canvas.addEventListener("click", filldrow);
canvas.addEventListener("mousemove", movemouse);
canvas.addEventListener("mousedown", startpaint);
document.addEventListener("mouseup", canclepaint);
canvas.addEventListener("mouseleave", canclepaint);

lineWidthh.addEventListener("change", linewidthhh);
colors.addEventListener("change", colorchan);

colorOption.forEach((varr) => varr.addEventListener("click", changecolor));
modeBtn.addEventListener("click", modeclick);
destroyBtn.addEventListener("click", destroy);
eraseBtn.addEventListener("click", eraserrr);
inputfile.addEventListener("change", uploadfile);
savebtn.addEventListener("click", saveimg);
