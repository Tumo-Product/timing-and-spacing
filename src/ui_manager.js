let UIManager = {
  previousButton: {},
  nextButton: {},
  playButton: {},
  pauseButton: {},
  exportButton: {},
  importButton: {},
  selectButton: {},
  correctFrames: [1, 8, 13, 18, 22, 25, 27, 29, 48],
  selectedFrames: [],
  frameCount: 0,
  _lastState: true,
  slideId: 0,

  initializeUIManager: function () {
    this.previousButton = document.getElementById("prevBtn");
    this.nextButton = document.getElementById("nextBtn");
    this.playButton = document.getElementById("playBtn");
    this.pauseButton = document.getElementById("pauseBtn");
    this.selectButton = document.getElementById("selectBtn");
    this.deselectButton = document.getElementById("deselectBtn");
    this.infoButton = document.getElementById("infoBtn");
    this.frameCount = res.frames.count;
    this.closeInfoButton = document.getElementById("closeInfoButton");
    this.sliderNextButton = document.getElementById("sliderNextButton");
    this.sliderPrevButton = document.getElementById("sliderPrevButton");
    this.initializeListeners();
  },
  initializeListeners: function () {
    this.nextButton.onclick = this.btnNext;
    this.previousButton.onclick = this.btnPrev;
    this.playButton.onclick = this.btnPlay;
    this.pauseButton.onclick = this.btnPause;
    this.selectButton.onclick = this.btnSelect;
    this.deselectButton.onclick = this.btnDeselect;
    this.infoButton.onclick = this.openInfoWindow;
    this.closeInfoButton.onclick = this.closeInfoWindow;
    this.sliderNextButton.onclick = this.slideRight;
    this.sliderPrevButton.onclick = this.slideLeft;
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
  openInfoWindow: function () {
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
    UIManager.sliderView(content.info);
  },
  closeInfoWindow: function (state) {
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
    if (
      typeof document.getElementById("saveBtnFrame") != "undefined" &&
      document.getElementById("saveBtnFrame") != null
    ) {
      document.getElementById("saveBtnFrame").remove();
    }
    if (
      typeof document.getElementById("checkBtnFrame") != "undefined" &&
      document.getElementById("checkBtnFrame") != null
    ) {
      document.getElementById("checkBtnFrame").remove();
    }
    if (state == "saved") {
      setAnimationState(false);
    }
  },
  sliderView: function (content) {
    const indexRow = document.getElementById("sliderIndex");
    const slidesContentField = document.getElementById("slidesContentField");
    slidesContentField.style.width = "auto";
    document.getElementById("infoContextRow").style.background = "none";
    document.getElementById("infoContextRow").style.height = "auto";
    document.getElementById("infoContextRow").style.flexDirection = "row";

    document.getElementById("prev").style.display = "block";
    document.getElementById("next").style.display = "block";
    slidesContentField.innerHTML = "";
    indexRow.innerHTML = "";

    var slideIndex = 0;
    for (const [key, value] of Object.entries(content)) {
      let slide = document.createElement("div");
      let indexCyrcle = document.createElement("div");
      slide.classList.add("slide");
      indexCyrcle.id = "i" + slideIndex;
      if (slideIndex == 0) {
        slide.classList.add("activeSlide");
        indexCyrcle.classList.add("activeIndex");
      }
      slide.id = slideIndex;
      slidesContentField.appendChild(slide);
      slideIndex++;

      if (value.gif != "") {
        let gifField = document.createElement("div");
        gifField.classList.add("gif");
        var gifImg = document.createElement("img");
        gifField.append(gifImg);
        gifImg.src = value.gif;
        slide.append(gifField);
      }
      let textField = document.createElement("div");
      textField.classList.add("slideCont");
      content[key]["cont"].forEach(function (value) {
        let paragraph = document.createElement("p");
        paragraph.innerHTML = value;
        textField.appendChild(paragraph);
        slide.append(textField);
      });

      indexRow.append(indexCyrcle);
    }
    UIManager.sliderButtonHelper();
  },
  slideRight: function () {
    var curentId = document.getElementsByClassName("activeSlide")[0].id;
    document.getElementById(curentId).classList.remove("activeSlide");
    document.getElementById(`i${curentId}`).classList.remove("activeIndex");
    curentId++;
    document.getElementById(curentId).classList.add("activeSlide");
    document.getElementById(`i${curentId}`).classList.add("activeIndex");
    UIManager.slideId++;
    UIManager.sliderButtonHelper();
  },
  slideLeft: function () {
    var curentId = document.getElementsByClassName("activeSlide")[0].id;
    document.getElementById(curentId).classList.remove("activeSlide");
    document.getElementById(`i${curentId}`).classList.remove("activeIndex");
    curentId--;
    document.getElementById(curentId).classList.add("activeSlide");
    document.getElementById(`i${curentId}`).classList.add("activeIndex");
    UIManager.slideId--;
    UIManager.sliderButtonHelper();
  },
  sliderButtonHelper: function () {
    let maxId =
      document.getElementById("slidesContentField").children.length - 1;
    if (UIManager.slideId == 0) {
      UIManager.sliderPrevButton.classList.add("disabledSliderBtn");
      UIManager.sliderPrevButton.style.pointerEvents = "none";
    } else if (UIManager.slideId == maxId) {
      UIManager.sliderNextButton.classList.add("disabledSliderBtn");
      UIManager.sliderNextButton.style.pointerEvents = "none";
    } else {
      UIManager.sliderNextButton.style.pointerEvents = "all";
      UIManager.sliderPrevButton.style.pointerEvents = "all";

      UIManager.sliderNextButton.classList.remove("disabledSliderBtn");
      UIManager.sliderPrevButton.classList.remove("disabledSliderBtn");
    }
  },
};
function answerCorrect(arr) {
  const sortedArray = arr.slice().sort((a, b) => a - b);
  return (
    sortedArray.length === UIManager.correctFrames.length &&
    UIManager.correctFrames.every((val, index) => val === sortedArray[index])
  );
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
