const { BadRequestError } = require("./expressError");
const fsP = require('fs/promises');


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  for (const num of strNums) {
    if (isNaN(Number(num))) {
      throw new BadRequestError(`${num} is not a number`);
    }
  }

  return strNums.map(num => Number(num));
}

async function writeToFile(result) {
  try {
    await fsP.writeFile("results.json", result, "utf8");
  } catch (err) {
    throw new BadRequestError(`ooo bad writing`);
  }
}

module.exports = { convertStrNums, writeToFile };