/**
 * Created by admin on 12/9/2019.
 */
let timeline = {};
let frameRate = {};
let initializeTimeline = (cnt) => {
  let container = document.getElementById("ticks1");
  for (let i = 1; i <= cnt; i++) {
    container.innerHTML += generateOption(i);
  }
  timeline = document.getElementById("timeline");
  frameRate = document.getElementById("crrFrame");
  timeline.min = 1;
  timeline.max = cnt;
  timeline.value = 1;
};

let generateOption = (id) => {
  let retString = "";
  if (id % 10 === 0) {
    retString = `<option value="${id}" id="op${id}"> </option>`;
  } else {
    retString = `<option value="${id}" id="op${id}"> </option>`;
  }

  return retString;
};

let setValue = (val) => {
  timeline.value = val;
};

let changeValue = () => {
  var scale = document.getElementById("scale");

  timeline = document.getElementById("timeline");
  animFr = parseInt(timeline.value);
  setAnimationState(false);
  scale.style.width = (timeline.value * 805) / 48 + "px";
  UIManager.btnStateHelper();
};

//state -> "correct", "wrong", "clear"
let setState = (id, state) => {
  let opt = document.getElementById(`op${id}`);
  switch (state) {
    case "correct":
      opt.classList.add("_right");
      break;
    case "wrong":
      opt.classList.add("_wrong");
      break;
    default:
      opt.className = "";
      break;
  }
};
