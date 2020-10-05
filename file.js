if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}

var fs = require("fs").promises,
  filename = process.argv[2];

async function readData() {
  const data = await fs.readFile(filename, "utf8");
  var classDetail = [];
  var lines = data.split("\n");
  //const date = lines[0].split(" ")[0];
  for (i = 0; i < lines.length; i++) {
    words = lines[i].split(" ");

    classDetail.push({
      day: words[0],
      sir: words[1],
      time: words[2],
      link: words[3],
    });
  }
  return classDetail;
}

module.exports.readData = readData;
