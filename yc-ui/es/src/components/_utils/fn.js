import "../../../node_modules/dayjs/dayjs.min.js";
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};
export {
  sleep
};
