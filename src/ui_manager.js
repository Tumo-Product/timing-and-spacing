let UIManager = {
  previousButton: {},
  nextButton: {},
  playButton: {},
  pauseButton: {},
  exportButton: {},
  importButton: {},
  selectButton: {},
  correctFrames: [1, 8, 13, 18, 22, 25, 27, 29, 48],
  selectedFrames: [1, 8, 13, 18, 22, 25, 27, 29, 48],
  frameCount: 0,
  _lastState: true,

  initializeUIManager: function () {
    this.previousButton = document.getElementById("prevBtn");
    this.nextButton = document.getElementById("nextBtn");
    this.playButton = document.getElementById("playBtn");
    this.pauseButton = document.getElementById("pauseBtn");
    this.selectButton = document.getElementById("selectBtn");
    this.deselectBtn = document.getElementById("deselectBtn");
    this.infoBtn = document.getElementById("infoBtn");
    this.frameCount = res.frames.count;
    this.closeInfoBtn = document.getElementById("closeInfoBtn");
    this.initializeListeners();
  },
  initializeListeners: function () {
    this.nextButton.onclick = this.btnNext;
    this.previousButton.onclick = this.btnPrev;
    this.playButton.onclick = this.btnPlay;
    this.pauseButton.onclick = this.btnPause;
    this.selectButton.onclick = this.btnSelect;
    this.deselectBtn.onclick = this.btnDeselect;
    this.infoBtn.onclick = this.btnInfo;
    this.closeInfoBtn.onclick = this.btnCloseInfo;
  },
  btnNext: function () {
    if (animFr !== UIManager.frameCount) {
      setAnimationState(false);
      animFr++;
      setValue(animFr);
      changeValue();
    }
    UIManager.btnStateHelper();
  },
  btnPrev: function () {
    if (animFr > 1) {
      setAnimationState(false);
      animFr--;
      setValue(animFr);
      changeValue();
    }
    UIManager.btnStateHelper();
  },
  btnPlay: function () {
    setAnimationState(true);
    UIManager.btnStateHelper();
  },
  btnPause: function () {
    setAnimationState(false);
    UIManager.btnStateHelper();
  },
  btnDeselect: function () {
    let crrId = animFr;
    let foundId = false;
    for (let i = 0; i < UIManager.selectedFrames.length; i++) {
      if (UIManager.selectedFrames[i] === crrId) {
        foundId = true;
      }
    }
    if (foundId) {
      UIManager.selectedFrames = UIManager.selectedFrames.filter(
        (e) => e !== crrId
      );
      removeSavedFrame(crrId);
      setState(crrId, "clear");
    }
  },
  btnSelect: function () {
    let crrId = animFr;
    let foundId = false;
    for (let i = 0; i < UIManager.selectedFrames.length; i++) {
      if (UIManager.selectedFrames[i] === crrId) {
        foundId = true;
      }
    }
    UIManager.selectedFrames.push(crrId);
    let crrFrame = false;
    for (let i = 0; i < UIManager.correctFrames.length; i++) {
      if (UIManager.correctFrames[i] === crrId) {
        crrFrame = true;
      }
    }
    addSavedFrame(crrId);
    setState(crrId, crrFrame ? "correct" : "wrong");
    UIManager.btnStateHelper();
  },
  clearUI: function () {
    for (let i = 0; i < UIManager.selectedFrames.length; i++) {
      removeSavedFrame(UIManager.selectedFrames[i]);
      setState(UIManager.selectedFrames[i], "clear");
    }
    UIManager.selectedFrames = [];
  },
  setSelect: function (id) {
    UIManager.selectedFrames.push(id);
    let crrFrame = false;
    for (let i = 0; i < UIManager.correctFrames.length; i++) {
      if (UIManager.correctFrames[i] === id) {
        crrFrame = true;
      }
    }
    addSavedFrame(id);
    setState(id, crrFrame ? "correct" : "wrong");
  },
  btnStateHelper: function () {
    this.nextButton.classList.remove("_inactiveBtn");
    this.previousButton.classList.remove("_inactiveBtn");
    if (animFr === 1) {
      this.previousButton.classList.add("_inactiveBtn");
    }
    if (animFr === UIManager.frameCount) {
      this.nextButton.classList.add("_inactiveBtn");
    }

    if (animState === this._lastState) return;

    this._lastState = animState;
    if (animState) {
      this.pauseButton.style.display = "flex";
      this.playButton.style.display = "none";
    } else {
      this.pauseButton.style.display = "none";
      this.playButton.style.display = "flex";
    }
  },
  btnInfo: function () {
    document.getElementById("info").style.display = "flex";
    setAnimationState(false);
    UIManager.btnStateHelper();
    document.getElementById("playBtn").style.pointerEvents = "none";
    document.getElementById("infoBtn").style.pointerEvents = "none";
    document.getElementById("nextBtn").style.pointerEvents = "none";
    document.getElementById("prevBtn").style.pointerEvents = "none";
    document.getElementById("importBtn").style.pointerEvents = "none";
    document.getElementById("exportBtn").style.pointerEvents = "none";
    document.getElementById("selectBtn").style.pointerEvents = "none";
    document.getElementById("deselectBtn").style.pointerEvents = "none";
    UIManager.presentData(content.info);
  },
  btnCloseInfo: function () {
    document.getElementById("info").style.display = "none";
    setAnimationState(true);
    UIManager.btnStateHelper();
    document.getElementById("playBtn").style.pointerEvents = "all";
    document.getElementById("infoBtn").style.pointerEvents = "all";
    document.getElementById("nextBtn").style.pointerEvents = "all";
    document.getElementById("prevBtn").style.pointerEvents = "all";
    document.getElementById("importBtn").style.pointerEvents = "all";
    document.getElementById("exportBtn").style.pointerEvents = "all";
    document.getElementById("selectBtn").style.pointerEvents = "all";
    document.getElementById("deselectBtn").style.pointerEvents = "all";
  },
  presentData: function (content) {
    const list = document.getElementById("contentList");
    list.innerHTML = "";
    content.forEach((row) => {
      const el = document.createElement("li");
      el.insertAdjacentHTML("beforeend", row);
      list.appendChild(el);
    });
  },
};
function checkTheAnswer(arr) {
  arr.sort((a, b) => a - b);
  if (arr.length != UIManager.correctFrames.length) return false;
  for (let i = 0; i < arr.length; i++) {
    if (!UIManager.correctFrames.includes(arr[i])) return false;
  }
  return true;
}
function shuffle(array) {
  var copy = [],
    n = array.length,
    i;
  while (n) {
    i = Math.floor(Math.random() * n--);
    copy.push(array.splice(i, 1)[0]);
  }
  return copy;
}
