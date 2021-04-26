const fs = require("fs");
/**
 * Write a file docstring here
 *
 * Author: Your Name
 */

/**
 * Use the function below to format your input/output arguments. Be sure not change the order of the elements in the output array.
 * Remember that code organization is very important to us, so we encourage the use of helper fuctions/separate files as you see fit.
 * Input:
 *      1. inputFile (String) = contains the name of a text file you need to read that is in the same directory, includes the ".txt" extension
 *         (ie. "input.txt")
 * Output:
 *      1. array containing the final x position of Pacman, final y position of Pacman, and total number of
 *         coins collected in that order (ie. [finalXPos, finalYPos, coinsCollected])
 */
function pacman(inputFile) {
  // Start writing your code here

  let coinsCollected = 0;
  let processedData = processFile(inputFile);
  console.log(processedData);

  //   return [finalXPos, finalYPos, coinsCollected];
}

function processFile(txtFile) {
  let data = fs.readFileSync(txtFile, "utf8").split("\n");

  return data.map((element) => {
    const directions = "NSEW";
    const whiteSpace = " ";
    let number = "";
    const arrayPair = [];

    for (let i = 0; i <= element.length; i++) {
      const character = element[i];

      if (i === element.length) arrayPair.push(Number(number));
      if (character === whiteSpace) {
        arrayPair.push(Number(number));
        number = "";
      } else if (!directions.includes(character)) {
        number += character;
      } else {
        return element;
      }
    }
    return arrayPair;
  });
}

module.exports.pacman = pacman;
