/**
 * Created by admin on 11/28/2019.
 */
document.addEventListener('contextmenu', event => event.preventDefault());
let canvas;
let alt_canvas;
let cont;
let alt_cont;
let animFr = 1;
let animState = true;
let maxFr = 0;
let currentFrame    = [];
let frameStack      = [];
let showTrajectory  = true;
window.onload = function () {
    canvas      = document.getElementById("canv");
    cont        = canvas.getContext('2d');
    cont.imageSmoothingEnabled      = false;
    alt_canvas  = document.getElementById("alt_canv");
    alt_cont    = alt_canvas.getContext('2d');
    alt_cont.imageSmoothingEnabled  = false;
    manager.LoadAnimation(SetupAnimation);
    initializeDataManager();
};

function SetupAnimation() {
    console.log("Loaded correctly");
    cont.drawImage(manager.frames[1], 0, 0);
    maxFr = res.frames.count;
    initializeTimeline(maxFr);
    UIManager.initializeUIManager();
    loopSys();
}

let loopSys = async () => {
    console.log(canvas.width, canvas.height);
    while(true){
        cont.clearRect(0, 0, canvas.width, canvas.height);
        initializeAndDrawFrames(animFr);
        await delay(20);
        if(animState) {
            animFr++;
            setValue(animFr);
        }
        if(animFr > res.frames.count) { animFr = 1; }
    }
};

let initializeAndDrawFrames = (a) => {
    currentFrame = [];
    currentFrame.push(manager.under_line);
    if(showTrajectory){
        currentFrame.push(manager.trajectory);
    }
    currentFrame.push(manager.frames[a]);
    drawFrame();
};

let drawFrame = () => {
    cont.clearRect(0,0, canvas.width, canvas.height);
    for(let i = 0; i < currentFrame.length; i++) {
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
    frameStack = frameStack.filter(e => e !== manager.frames[id]);
    redrawSavedFrames();
};

let redrawSavedFrames = () => {
    alt_cont.clearRect(0,0,alt_canvas.width, alt_canvas.height);
    for(let i = 0; i < frameStack.length; i++){
        alt_cont.drawImage(frameStack[i], 0,0, alt_canvas.width, alt_canvas.height);
    }
};

const delay = ms => new Promise(res => setTimeout(res, ms));