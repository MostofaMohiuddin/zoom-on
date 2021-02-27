const { exit } = require("process");
const { default: formatDate } = require("./formatDate");

function displayClass(classDetails, indexOfcomingClass, isTodayClass) {
  if (classDetails.length == 0 || indexOfcomingClass > 1) return;
  for (let index = 0; index < classDetails.length; index++) {
    console.log(
      "Class#" +
        (index + 1) +
        " :-  time: " +
        classDetails[index].time +
        "   Teacher: " +
        classDetails[index].sir +
        " sir"
    );
  }
  var secondsRemain;
  if (isTodayClass)
    secondsRemain = Math.round(
      Math.abs(
        new Date() -
          new Date(
            formatDate(new Date()) + " " + classDetails[indexOfcomingClass].time
          )
      ) / 1000
    );
  else {
    var tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    secondsRemain = Math.round(
      Math.abs(
        new Date() -
          new Date(
            formatDate(tomorrow) + " " + classDetails[indexOfcomingClass].time
          )
      ) / 1000
    );
  }
  var h = Math.floor(secondsRemain / 3600);
  var m = Math.floor((secondsRemain % 3600) / 60);
  var s = Math.floor((secondsRemain % 3600) % 60);
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  console.log(
    "class#" +
      (indexOfcomingClass + 1) +
      " will start after " +
      hDisplay +
      mDisplay +
      sDisplay
  );
  setTimeout(() => indexOfcomingClass++, secondsRemain * 1000);
  setTimeout(() => console.clear(), 4000);
  setTimeout(() => displayClass(classDetails, indexOfcomingClass), 5000);
}

module.exports.displayClass = displayClass;
