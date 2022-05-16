const showAnswer = async function () {
  var answer = await pluginAPI.initialize();
  pluginAPI.setHeight(100);
  answer = [true];
  if (answer[0]) {
    pluginAPI.examine(true);
    console.log(document.getElementById("answerBox"));
    document.getElementById("answerBox").style.background = "#8CC541";
  } else {
    pluginAPI.examine(false);
    document.getElementById("answerBox").style.background = "#F25A2A";
  }
};
showAnswer();
