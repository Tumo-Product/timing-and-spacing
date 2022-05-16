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

let importBtnPressed = () => {
  setAnimationState(false);
  let importKey = prompt("Please paste your key");
  try {
    importKey = Base64.decode(importKey);
    let strArray = importKey.split(":");
    console.log(strArray);
    let numArray = [];
    for (let i = 0; i < strArray.length; i++) {
      numArray.push(parseInt(strArray[i]));
    }
    UIManager.clearUI();
    console.log(numArray);
    for (let i = 0; i < numArray.length; i++) {
      UIManager.setSelect(numArray[i]);
    }
  } catch (error) {
    alert("Invalid Code");
  }
};

let exportBtnPressed = () => {
  setAnimationState(false);

  if (secondTime) {
    prompt("Please copy this key:", secondTimeKey);
  } else {
    if (checkTheAnswer(UIManager.selectedFrames)) {
      pluginAPI.setAnswers([true]);
      let selectedList = shuffle(UIManager.selectedFrames);
      let exportString = "";
      for (let i = 0; i < selectedList.length; i++) {
        exportString += selectedList[i];
        exportString += i === selectedList.length - 1 ? "" : ":";
      }
      let exportKey = Base64.encode(exportString);
      if (exportKey === "") {
        exportKey = "Nothing To Export...";
      }
      prompt("Please copy this key:", exportKey);
      document.getElementById("row").style.backgroundColor = "#97D644";
      secondTimeKey = exportKey;
      secondTime = true;
    } else {
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
