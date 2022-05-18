const pluginAPI = {
  initialize: async () => {
    postMessage("init");
    let value = false;

    await new Promise((resolve) => {
      window.addEventListener("message", async (event) => {
        if (event.data.application !== "activity-manager") {
          resolve();
          return;
        }
        const { data } = event.data;

        if (!data) {
          resolve();
          value = false;
          return;
        }
        if (data.message) {
          resolve();
          if (data.answers) {
            value = data.answers[0];
            return;
          }
        }
        resolve();
        value = false;
      });
    });
    return value;
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
