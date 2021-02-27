var opn = require("opn");
const { default: formatDate } = require("./formatDate");
const readData = require("./file").readData;
const displayClass = require("./displayclass").displayClass;
const closeZoom = require("./close").closeZoom;

async function filterClass(isToday, classDetails) {}

function openZoom(timeInterval) {
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

async function main() {
  const classDetails = await readData();
  const days = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
  const today = new Date().getDay();
  var isTodayClass = false;

  var tempClassDetails = classDetails.filter((classDetail) => {
    const classTime = new Date(formatDate(new Date()) + " " + classDetail.time);
    let timeInterval = classTime - new Date();

    if (timeInterval >= 0 && days[today] === classDetail.day) {
      isTodayClass = true;
      return true;
    } else if (!isTodayClass && days[today + 1] === classDetail.day)
      return true;

    // let isTodayClass = days[today] === classDetail.day && timeInterval >= 0;
    // console.log(
    //   !isTodayClass,
    //   !isTodayClass && days[today + 1] === classDetail.day
    // );
    // console.log("");
    // return (
    //   isTodayClass || (!isTodayClass && days[today + 1] === classDetail.day)
    // );
  });
  // console.log(tempClassDetails);

  for (let index = 0; index < tempClassDetails.length; index++) {
    var classTime;
    var timeInterval;
    if (isTodayClass)
      classTime = new Date(
        formatDate(new Date()) + " " + tempClassDetails[index].time
      );
    else {
      var tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      classTime = new Date(
        formatDate(tomorrow) + " " + tempClassDetails[index].time
      );
    }
    timeInterval = classTime - new Date();

    // console.log(timeInterval > 0);

    openZoom(timeInterval);
  }
  if (timeInterval >= 0) displayClass(tempClassDetails, 0, isTodayClass);
}

main();
