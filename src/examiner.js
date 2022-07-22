const showAnswer = async function () {
  let answer = await pluginAPI.initialize();
  pluginAPI.examine(answer.answer_state);
  pluginAPI.setHeight(100);
  document.getElementById("answerBox").style.background = answer.answer_state? "#8CC541" : "#F25A2A";
};
window.onload = showAnswer;
