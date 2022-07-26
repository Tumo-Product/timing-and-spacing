const pluginAPI = {
  initialize: async () => {
    postMessage("init");
    const initData = {language:undefined, answer_state:false};
    await new Promise((resolve) => {
      window.addEventListener("message", async (event) => {
        if (event.data.application !== "activity-manager") {
          resolve();
          return;
        }
        const { data } = event.data;

        if (data && data.answers) {
          initData.language = data.language;
          initData.answer_state = data.answers[0];
          resolve();
          return;
        }
        initData.answer_state = false;
        resolve();
        
      });
    });
    return initData;
  },
  setHeight: async (height) => {
    postMessage("set-iframe-height", { iframeHeight: height });
  },
  setAnswers: (outcome) => {
    postMessage("set-answers", { answers: outcome });
  },
  examine: (status) => {
    postMessage("auto-examine", { status: status });
  },
};
const postMessage = (message, data) => {
  window.parent.postMessage(
    {
      application: "activity-manager",
      message: message,
      data: data,
    },
    "*"
  );
};
