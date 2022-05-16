const pluginAPI = {
  initialize: async () => {
    postMessage("init");
    return new Promise((resolve) => {
      window.addEventListener("message", async (event) => {
        if (event.data.application !== "activity-manager") {
          return;
        }

        const { data } = event.data;

        if (data === undefined) {
          resolve();
          return false;
        }

        if (data.message !== undefined) {
          resolve();
          return true;
        }
      });
    });
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
pluginAPI.initialize();
