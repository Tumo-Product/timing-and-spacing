const showAnswer = async function () {
  let answer = await pluginAPI.initialize();

  pluginAPI.examine(answer);
  pluginAPI.setHeight(100);
  document.getElementById("answerBox").style.background = answer
    ? "#8CC541"
    : "#F25A2A";
};
window.onload = showAnswer;
