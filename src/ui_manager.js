/**
 * Created by admin on 12/11/2019.
 */
let UIManager = {
    previousButton  : {},
    nextButton      : {},
    playButton      : {},
    pauseButton     : {},
    exportButton    : {},
    importButton    : {},
    selectButton    : {},
    correctFrames   : [1,8,13, 18, 22, 25, 27, 29, 54],
    selectedFrames  : [],
    frameCount      : 0,
    _lastState      : true,

    initializeUIManager : function () {
        this.previousButton =   document.getElementById("prevBtn");
        this.nextButton     =   document.getElementById("nextBtn");
        this.playButton     =   document.getElementById("playBtn");
        this.pauseButton    =   document.getElementById("pauseBtn");
        this.selectButton   =   document.getElementById("selectBtn");
        this.deselectBtn    =   document.getElementById("deselectBtn");
        this.frameCount     =   res.frames.count;
        console.log(res, res.frames, res.frames.count);
        console.log(this.frameCount);
        this.initializeListeners();
    },
    
    initializeListeners : function () {
        this.nextButton.onclick     = this.btnNext;
        this.previousButton.onclick = this.btnPrev;
        this.playButton.onclick     = this.btnPlay;
        this.pauseButton.onclick    = this.btnPause;
        this.selectButton.onclick   = this.btnSelect;
        this.deselectBtn.onclick    = this.btnSelect;
        console.log(this.frameCount);
    },
    
    btnNext : function () {
        console.log(animFr, UIManager.frameCount);
        if(animFr !== UIManager.frameCount){
            setAnimationState(false);
            animFr++;
            setValue(animFr);
        }
        UIManager.btnStateHelper();
    },

    btnPrev : function (){
        console.log(animFr);
        if(animFr > 1){
            setAnimationState(false);
            animFr--;
            setValue(animFr);
        }
        UIManager.btnStateHelper();
    },
    
    btnPlay : function () {
        setAnimationState(true);
        UIManager.btnStateHelper();
    },
    
    btnPause : function () {
        setAnimationState(false);
        UIManager.btnStateHelper();
    },
        
    btnSelect : function () {
        let crrId = animFr;
        let foundId = false;
        for(let i = 0; i < UIManager.selectedFrames.length; i++){
            console.log("search" , UIManager.selectedFrames[i], crrId);
            if(UIManager.selectedFrames[i] === crrId){
                foundId = true;
            }
        }
        if(foundId){
            UIManager.selectedFrames = UIManager.selectedFrames.filter(e => e !== crrId);
            console.log(UIManager.selectedFrames);
            removeSavedFrame(crrId);
            setState(crrId, "clear");
        } else {
            UIManager.selectedFrames.push(crrId);
            let crrFrame = false;
            for(let i = 0; i < UIManager.correctFrames.length; i++){
                if(UIManager.correctFrames[i] === crrId){
                    crrFrame = true;
                }
            }
            addSavedFrame(crrId);
            setState(crrId, crrFrame ? "correct" : "wrong");
        }
        UIManager.btnStateHelper();
    },
    
    clearUI : function () {
        for(let i = 0; i < UIManager.selectedFrames.length; i++){
            removeSavedFrame(UIManager.selectedFrames[i]);
            setState(UIManager.selectedFrames[i], "clear");
        }
        UIManager.selectedFrames = [];
    },

    setSelect : function (id) {
        UIManager.selectedFrames.push(id);
        let crrFrame = false;
        for(let i = 0; i < UIManager.correctFrames.length; i++){
            if(UIManager.correctFrames[i] === id){
                crrFrame = true;
            }
        }
        addSavedFrame(id);
        setState(id, crrFrame ? "correct" : "wrong");
    },
    
    btnStateHelper : function () {
        this.nextButton.classList.remove("_inactiveBtn");
        this.previousButton.classList.remove("_inactiveBtn");
        if(animFr === 1){
            this.previousButton.classList.add("_inactiveBtn");
        }
        if(animFr === UIManager.frameCount){
            this.nextButton.classList.add("_inactiveBtn");
        }
        if(UIManager.selectedFrames.includes(animFr)){
            this.deselectBtn.style.display  = "block";
            this.selectButton.style.display = "none";
        } else {
            this.selectButton.style.display = "block";
            this.deselectBtn.style.display  = "none";
        }

        if(animState === this._lastState)
            return;

        this._lastState = animState;
        if(animState){
            this.playButton.classList.add("_inactiveBtn");
            this.pauseButton.classList.remove("_inactiveBtn");
        } else {
            this.playButton.classList.remove("_inactiveBtn");
            this.pauseButton.classList.add("_inactiveBtn");
        }

    },
    

};