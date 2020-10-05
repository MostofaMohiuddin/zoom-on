const find = require("find-process");

const getProcessListAndKill = async () => {
  const list = await find("name", "Zoom.exe");
  //   setTimeout(() => {
  for (let index = 0; index < list.length; index++) {
    process.kill(list[index].pid);
    //console.log("hello");
  }
  //   }, 1000 * 60 * delayMin);
};

module.exports.closeZoom = getProcessListAndKill;

// getProcessListAndKill(0.5);
