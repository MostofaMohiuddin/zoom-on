var opn = require("opn");
const { default: formatDate } = require("./formatDate");
const readData = require("./file").readData;
const displayClass = require("./displayclass").displayClass;
const closeZoom = require("./close").closeZoom;

async function main() {
  const classDetails = await readData();
  const days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
  const today = new Date().getDay();
  var tempClassDetails = classDetails.filter((classDetail) => {
    return days[today] === classDetail.day;
  });

  for (let index = 0; index < tempClassDetails.length; index++) {
    const classTime = new Date(
      formatDate(new Date()) + " " + tempClassDetails[index].time
    );
    var timeInterval = classTime - new Date();

    if (timeInterval >= 0) {
      setTimeout(() => {
        console.log(tempClassDetails[index]);
        opn(tempClassDetails[index].link, {
          // app: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        });
        console.log("Opening Zoom...");

        setTimeout(() => closeZoom(), 1000 * 60 * 52);
        //tempClassDetails.shift();
      }, timeInterval);
    }
  }
  displayClass(tempClassDetails, 0);
}

main();
