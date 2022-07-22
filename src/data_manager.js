/**
 * Created by admin on 12/19/2019.
 */
let importBtn = {};
let exportBtn = {};
var secondTime = false;
var secondTimeKey = "";
let initializeDataManager = () => {
  importBtn = document.getElementById("importBtn");
  exportBtn = document.getElementById("exportBtn");
  importBtn.onclick = importBtnPressed;
  exportBtn.onclick = exportBtnPressed;
};

let saveAnswerToBuffer = () => {
  var text = document.getElementById("codeText");
  navigator.clipboard.writeText(text.innerHTML);
  UIManager.closeInfoWindow("saved");
};

let importBtnPressed = () => {
  setAnimationState(false);

  getAnswer();
};

let exportBtnPressed = () => {
  setAnimationState(false);
  // We need second time variable to fix showing save popup for multiple times.
  // Without this the popup will not appear more than one time.
  //In future export button will be removed as soon as plugins will be autochecked. Remove this and importBtnPressed functions when pluggin will support autochecking. 
  // Todo: remove this variable and find a solution to fix the issue.
  if (secondTime) {
    showAnswer(secondTimeKey);
  } else {
    if (answerCorrect(UIManager.selectedFrames)) {
      //TODO: Check tool setAnswers function. In some cases it is pressing answer or reject button in activity manager in some cases not. Find the answer and solution.
      pluginAPI.setAnswers([true]);
      let selectedList = shuffle(UIManager.selectedFrames);
      let exportString = "";
      for (let i = 0; i < selectedList.length; i++) {
        exportString += selectedList[i];
        exportString += i === selectedList.length - 1 ? "" : ":";
      }
      let exportKey = Base64.encode(exportString);

      showAnswer(exportKey);

      document.getElementById("row").style.backgroundColor = "#97D644";
      secondTimeKey = exportKey;
      secondTime = true;
    } else {
      pluginAPI.setAnswers([false]);
      document.getElementById("row").style.bottom = 14 + "px";
      document.getElementById("row").style.animation = "wrongToright 1.5s ";
      setTimeout(function () {
        document.getElementById("row").style.animation = "none";
      }, 1500);
      document.getElementById("playBtn").style.display = "flex";
      document.getElementById("pauseBtn").style.display = "none";
      setTimeout(function () {
        document.getElementById("exportBtn").style.animation = "none";
        document.getElementById("playBtn").style.display = "none";
        document.getElementById("pauseBtn").style.display = "flex";
        setAnimationState(true);
      }, 800);
    }
  }
};

function showAnswer(content) {
  var infoContextRow = document.getElementById("infoContextRow");
  var slidesContentField = document.getElementById("slidesContentField");
  var codeFrame = document.createElement("div");
  var code = document.createElement("p");
  var saveBtnFrame = document.createElement("div");
  var saveBtn = document.createElement("button");
  var saveImg = document.createElement("img");
  document.getElementById("info").style.display = "flex";
  document.getElementById("prev").style.display = "none";
  document.getElementById("next").style.display = "none";

  slidesContentField.innerHTML = "";
  slidesContentField.style.width = "100%";

  document.getElementById("sliderIndex").innerHTML = "";

  document.getElementById("infoButtonRowBg").style.background = "none";

  infoContextRow.style.background =
    "url('./assets/newUI/bg.png') center center / 58%";
  infoContextRow.style.height = "288px";
  infoContextRow.style.flexDirection = "column";

  code.classList.add("codeText");
  code.id = "codeText";
  code.innerHTML = "Invalide Code";

  codeFrame.classList.add("codeFrame");
  codeFrame.id = "codeFrame";
  codeFrame.appendChild(code);

  if (content != "error") {
    code.innerHTML = content;
    saveBtnFrame.classList.add("saveBtnFrame");
    saveBtnFrame.id = "saveBtnFrame";
    saveBtn.id = "saveBtn";
    saveBtn.setAttribute("onclick", "saveAnswerToBuffer()");
    saveImg.src = "./assets/newUI/save.svg";
    saveBtn.appendChild(saveImg);
    saveBtnFrame.appendChild(saveBtn);
    infoContextRow.appendChild(saveBtnFrame);
  }
  slidesContentField.appendChild(codeFrame);
  if (content == "error") {
    document.getElementById("codeFrame").style.width = "100%";
    infoContextRow.style.animation = "wrongToright 1s ";
    setTimeout(function () {
      getAnswer();
      infoContextRow.style.animation = "none";
    }, 800);
  }
}

function getAnswer() {
  if (
    typeof document.getElementById("checkBtnFrame") != "undefined" &&
    document.getElementById("checkBtnFrame") != null
  ) {
    document.getElementById("checkBtnFrame").remove();
  }
  var infoContextRow = document.getElementById("infoContextRow");
  var slidesContentField = document.getElementById("slidesContentField");
  var inputFrame = document.createElement("div");
  var input = document.createElement("input");

  var checkBtnFrame = document.createElement("div");
  var checkBtn = document.createElement("button");
  var checkImg = document.createElement("img");

  document.getElementById("info").style.display = "flex";
  document.getElementById("prev").style.display = "none";
  document.getElementById("next").style.display = "none";

  slidesContentField.innerHTML = "";
  slidesContentField.style.width = "100%";

  document.getElementById("sliderIndex").innerHTML = "";

  document.getElementById("infoButtonRowBg").style.background = "none";

  infoContextRow.style.background =
    "url('./assets/newUI/bg.png') center center / 58%";
  infoContextRow.style.height = "288px";
  infoContextRow.style.flexDirection = "column";

  input.classList.add("inputText");
  input.id = "inputText";

  inputFrame.classList.add("codeFrame");
  slidesContentField.style.width = "100%";
  inputFrame.style.width = "100%";

  inputFrame.appendChild(input);

  checkBtnFrame.classList.add("checkBtnFrame");
  checkBtnFrame.id = "checkBtnFrame";
  checkBtn.id = "checkBtn";
  checkBtn.setAttribute("onclick", "drawAnswer()");
  checkImg.src = "./assets/newUI/export.svg";
  checkBtn.appendChild(checkImg);
  checkBtnFrame.appendChild(checkBtn);
  infoContextRow.appendChild(checkBtnFrame);

  slidesContentField.appendChild(inputFrame);
}

function drawAnswer() {
  let importKey = document.getElementById("inputText").value;
  try {
    importKey = Base64.decode(importKey);
    let strArray = importKey.split(":");
    let numArray = [];
    for (let i = 0; i < strArray.length; i++) {
      numArray.push(parseInt(strArray[i]));
    }
    UIManager.clearUI();
    for (let i = 0; i < numArray.length; i++) {
      UIManager.setSelect(numArray[i]);
    }
    UIManager.closeInfoWindow("saved");
  } catch (error) {
    showAnswer("error");
  }
}
