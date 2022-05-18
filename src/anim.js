/**
 * Created by admin on 11/28/2019.
 */
document.addEventListener("contextmenu", (event) => event.preventDefault());
let animationCanvas;
let studentAnswersCanvas;
let animationCanvasContent;
let studentAnswersContent;
let animFr = 1;
let animState = true;
let maxFr = 0;
let currentFrame = [];
let frameStack = [];
let showTrajectory = true;
var content;
let language = languageFromURL(window.location.href);
let getData = getText().then(function (e) {
  content = e.data[language];
});
window.onload = function () {
  pluginAPI.setHeight(600);
  document
    .getElementById("start")
    .appendChild(document.createTextNode(content.start));
  playAndPauseButtonsState("none");
  animationCanvas = document.getElementById("canv");
  animationCanvasContent = animationCanvas.getContext("2d");
  animationCanvasContent.imageSmoothingEnabled = false;
  studentAnswersCanvas = document.getElementById("studentAnswersCanvas");
  studentAnswersContent = studentAnswersCanvas.getContext("2d");
  studentAnswersContent.imageSmoothingEnabled = true;
  manager.LoadAnimation(SetupAnimation);
  initializeDataManager();
  setAnimationState(false);
};

function start() {
  document.getElementById("startFrame").style.animation =
    "moveDown 1.6s forwards";
  document.getElementById("row").style.animation = "moveRowDown 1s forwards";
  document.getElementById("controlRow").style.animation =
    "moveButtonsDown 1s forwards";

  setTimeout(function () {
    document.getElementById("playBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "flex";
    document.getElementById("row").style.display = "block";
  }, 100);
  setAnimationState(true);
  playAndPauseButtonsState("all");
}

function SetupAnimation() {
  animationCanvasContent.drawImage(manager.frames[1], 0, 0);
  maxFr = res.frames.count;
  initializeTimeline(maxFr);
  UIManager.initializeUIManager();
  loopSystem();
}

let loopSystem = async () => {
  const range = document.getElementById("timeline");
  while (true) {
    animationCanvasContent.clearRect(
      0,
      0,
      animationCanvas.width,
      animationCanvas.height
    );
    initializeAndDrawFrames(animFr);
    var scale = document.getElementById("scale");
    var timeline = document.getElementById("timeline");
    await delay(37);
    if (animState) {
      if (timeline.value > 30) scale.style.width = timeline.value * 16.5 + "px";
      else if (timeline.value == 48) scale.style.width = "778.08px";
      else scale.style.width = timeline.value * 16.8 + "px";
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
  animationCanvasContent.clearRect(
    0,
    0,
    animationCanvas.width,
    animationCanvas.height
  );
  for (let i = 0; i < currentFrame.length; i++) {
    animationCanvasContent.drawImage(
      currentFrame[i],
      0,
      0,
      animationCanvas.width,
      animationCanvas.height
    );
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
  studentAnswersContent.clearRect(
    0,
    0,
    studentAnswersCanvas.width,
    studentAnswersCanvas.height
  );
  for (let i = 0; i < frameStack.length; i++) {
    studentAnswersContent.drawImage(
      frameStack[i],
      0,
      0,
      studentAnswersCanvas.width,
      studentAnswersCanvas.height
    );
  }
};

async function getText() {
  const request = await fetch("../text.json");
  const content = await request.json();
  return content;
}

function languageFromURL(url) {
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
  return parms["lang"][0];
}
//none || all
function playAndPauseButtonsState(state) {
  if (state == "all") {
    document.getElementById("playBtn").style.pointerEvents = "all";
    document.getElementById("nextBtn").style.pointerEvents = "all";
    document.getElementById("prevBtn").style.pointerEvents = "all";
    document.getElementById("infoBtn").style.pointerEvents = "all";
    document.getElementById("playBtn").classList.remove("_inactiveBtn");
    document.getElementById("infoBtn").classList.remove("_inactiveBtn");
    document.getElementById("prevBtn").classList.remove("_inactiveBtn");
    document.getElementById("nextBtn").classList.remove("_inactiveBtn");
  } else if (state == "none") {
    document.getElementById("playBtn").style.pointerEvents = "none";
    document.getElementById("infoBtn").style.pointerEvents = "none";
    document.getElementById("nextBtn").style.pointerEvents = "none";
    document.getElementById("prevBtn").style.pointerEvents = "none";
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
