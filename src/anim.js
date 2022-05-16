/**
 * Created by admin on 11/28/2019.
 */
document.addEventListener("contextmenu", (event) => event.preventDefault());
let canvas;
let alt_canvas;
let cont;
let alt_cont;
let animFr = 1;
let animState = true;
let maxFr = 0;
let currentFrame = [];
let frameStack = [];
let showTrajectory = true;
var content;
let getData = getText().then(function (e) {
  content = e["data"][getLanguage];
});
let getLanguage = parseURLParams(window.location.href);
window.onload = function () {
  document
    .getElementById("start")
    .appendChild(document.createTextNode(content.start));
  document.getElementById("playBtn").style.pointerEvents = "none";
  document.getElementById("infoBtn").style.pointerEvents = "none";
  document.getElementById("nextBtn").style.pointerEvents = "none";
  document.getElementById("prevBtn").style.pointerEvents = "none";
  canvas = document.getElementById("canv");
  cont = canvas.getContext("2d");
  cont.imageSmoothingEnabled = false;
  alt_canvas = document.getElementById("alt_canv");
  alt_cont = alt_canvas.getContext("2d");
  alt_cont.imageSmoothingEnabled = true;
  manager.LoadAnimation(SetupAnimation);
  initializeDataManager();
  setAnimationState(false);
};

function start() {
  document.getElementById("playBtn").style.pointerEvents = "all";
  document.getElementById("nextBtn").style.pointerEvents = "all";
  document.getElementById("prevBtn").style.pointerEvents = "all";
  document.getElementById("infoBtn").style.pointerEvents = "all";
  document.getElementById("playBtn").classList.remove("_inactiveBtn");
  document.getElementById("infoBtn").classList.remove("_inactiveBtn");
  document.getElementById("prevBtn").classList.remove("_inactiveBtn");
  document.getElementById("nextBtn").classList.remove("_inactiveBtn");
  document.getElementById("start_frame").style.animation =
    "moveDown 1.6s forwards";
  document.getElementById("row").style.animation = "moveRowDown 1s forwards";
  document.getElementById("control_row").style.animation =
    "moveButtonsDown 1s forwards";

  setTimeout(function () {
    document.getElementById("playBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "flex";
    document.getElementById("row").style.display = "block";
  }, 100);
  setAnimationState(true);
}

function SetupAnimation() {
  cont.drawImage(manager.frames[1], 0, 0);
  maxFr = res.frames.count;
  initializeTimeline(maxFr);
  UIManager.initializeUIManager();
  loopSys();
}

let loopSys = async () => {
  const range = document.getElementById("timeline");
  var width = 16.21;
  while (true) {
    cont.clearRect(0, 0, canvas.width, canvas.height);
    initializeAndDrawFrames(animFr);
    var scale = document.getElementById("scale");
    var timeline = document.getElementById("timeline");
    await delay(37);
    if (animState) {
      scale.style.width = timeline.value * 16.75 + "px";
      animFr++;
      setValue(animFr);
    }
    if (animFr > res.frames.count) {
      animFr = 1;
    }
  }
};

let initializeAndDrawFrames = (a) => {
  currentFrame = [];
  currentFrame.push(manager.under_line);
  if (showTrajectory) {
    currentFrame.push(manager.trajectory);
  }
  currentFrame.push(manager.frames[a]);
  drawFrame();
};

let drawFrame = () => {
  cont.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < currentFrame.length; i++) {
    cont.drawImage(currentFrame[i], 0, 0, canvas.width, canvas.height);
  }
};

let setAnimationState = (val) => {
  animState = val;
};

let addSavedFrame = (id) => {
  frameStack.push(manager.frames[id]);
  redrawSavedFrames();
};

let removeSavedFrame = (id) => {
  frameStack = frameStack.filter((e) => e !== manager.frames[id]);
  redrawSavedFrames();
};

let redrawSavedFrames = () => {
  alt_cont.clearRect(0, 0, alt_canvas.width, alt_canvas.height);
  for (let i = 0; i < frameStack.length; i++) {
    alt_cont.drawImage(
      frameStack[i],
      0,
      0,
      alt_canvas.width,
      alt_canvas.height
    );
  }
};

async function getText() {
  const request = await fetch("../text.json");
  const content = await request.json();
  return content;
}

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
    queryEnd = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {},
    i,
    n,
    v,
    nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);

    if (!parms.hasOwnProperty(n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
  }
  return parms["lang"];
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
