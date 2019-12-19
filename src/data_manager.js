/**
 * Created by admin on 12/19/2019.
 */
let importBtn = {};
let exportBtn = {};

let initializeDataManager = () => {
    importBtn = document.getElementById("importBtn");
    exportBtn = document.getElementById("exportBtn");
    importBtn.onclick = importBtnPressed;
    exportBtn.onclick = exportBtnPressed;
};

let importBtnPressed = () => {
    setAnimationState(false);
    let importKey = prompt("Please paste your key");
    try{
        importKey = Base64.decode(importKey);
        let strArray = importKey.split(':');
        console.log(strArray);
        let numArray = [];
        for(let i = 0; i < strArray.length; i++){
            numArray.push(parseInt(strArray[i]));
        }
        UIManager.clearUI();
        console.log(numArray);
        for(let i = 0; i < numArray.length; i++){
            UIManager.setSelect(numArray[i]);
        }
    } catch (error){
        alert("Invalid Code");
    }

};

let exportBtnPressed = () => {
    setAnimationState(false);
    let selectedList = UIManager.selectedFrames;
    let exportString = "";
    for(let i = 0; i < selectedList.length; i++){
        exportString += selectedList[i];
        exportString += i === selectedList.length - 1 ? "" : ":";
    }
    let exportKey = Base64.encode(exportString);
    prompt("Please copy this key:", exportKey);
};