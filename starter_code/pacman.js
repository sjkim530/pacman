const fs = require("fs");
/**
 * Write a file docstring here
 *
 * Author: Seong Jin Kim
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

/**
 * pacman function - Main function
 *
 * Using the contents of the input text file, the 'Pac-man' will traverse the game board and collect coins.
 *
 * @param {String} inputFile - The text file to read and process
 * @returns {Array} - [finalXPos, finalYPos, coinsCollected]
 */
function pacman(inputFile) {
  // Start writing your code here
  let processedData = processFile(inputFile);
  const boardDimension = processedData[0];
  const startPos = processedData[1];
  const startPosX = startPos[0];
  const startPosY = startPos[1];

  if (
    startPosY > boardDimension[1] ||
    startPosX > boardDimension[0] ||
    startPosY < 0 ||
    startPosX < 0
  ) {
    return [-1, -1, 0];
  } else {
    let gameBoard = createBoard(processedData);

    return traverseBoard(gameBoard, processedData);
  }
}

/**
 * processFile function - Helper function
 *
 * Converts each line into an array pair of number elements except for the string with direction information
 *
 * @param {String} txtFile - The content of the text file
 * @returns {Array}
 */
function processFile(txtFile) {
  let data = fs.readFileSync(txtFile, "utf8").split("\n");

  if (!data[data.length - 1].length) data.pop();

  return data.map((element) => {
    const whiteSpace = " ";

    if (element.includes(whiteSpace)) {
      let array = element.split(" ");
      return [Number(array[0]), Number(array[1])];
    } else {
      return element;
    }
  });
}

/**
 * createBoard function - Helper Function
 *
 * Generates a game board (2D array matrix) with COINs and WALLs
 *
 * @param {Array} boardData - Content of the text file in an array
 * @returns {Array}
 */
function createBoard(boardData) {
  const boardDimension = boardData[0];
  let board = [];

  for (let i = 0; i < boardDimension[1]; i++) {
    board.push([]);
    for (let j = 0; j < boardDimension[0]; j++) {
      board[i][j] = "COIN";
    }
  }

  for (let k = 3; k < boardData.length; k++) {
    const wall = boardData[k];

    board[wall[1]][wall[0]] = "WALL";
  }

  return board;
}
/**
 * traverseBoard function - Helper function
 *
 * Iterating through the directions string, 'Pac-man' will traverse through the game board collecting COINs.
 * If 'Pac-man' reaches a WALL or goes out of bounds, 'Pac-man' will stay in place.
 * Otherwise, 'Pac-man' will collect COIN if available.
 *
 * @param {Array} board - Game board generated by createBoard function
 * @param {Array} boardData - Content of the text file in an array
 * @returns {Array}
 */
function traverseBoard(board, boardData) {
  const startPos = boardData[1];
  const startPosX = startPos[0];
  const startPosY = startPos[1];
  let currPosX = startPosX;
  let currPosY = startPosY;
  const movements = boardData[2];
  let coinsCollected = 0;

  for (let i = -1; i < movements.length; i++) {
    const direction = movements[i];
    if (i === -1) {
      if (board[startPosY][startPosX] === "WALL") return [-1, -1, 0];
      else board[startPosY][startPosX] = "VISITED";
    } else {
      if (direction === "N") {
        if (board[currPosY + 1][currPosX] === "COIN") {
          currPosY++;
          coinsCollected++;
          board[currPosY][currPosX] = "VISITED";
        } else if (board[currPosY + 1][currPosX] === "VISITED") {
          currPosY++;
        }
      } else if (direction === "S") {
        if (board[currPosY - 1][currPosX] === "COIN") {
          currPosY--;
          coinsCollected++;
          board[currPosY][currPosX] = "VISITED";
        } else if (board[currPosY - 1][currPosX] === "VISITED") {
          currPosY--;
        }
      } else if (direction === "E") {
        if (board[currPosY][currPosX + 1] === "COIN") {
          currPosX++;
          coinsCollected++;
          board[currPosY][currPosX] = "VISITED";
        } else if (board[currPosY][currPosX + 1] === "VISITED") {
          currPosX++;
        }
      } else {
        if (board[currPosY][currPosX - 1] === "COIN") {
          currPosX--;
          coinsCollected++;
          board[currPosY][currPosX] = "VISITED";
        } else if (board[currPosY][currPosX - 1] === "VISITED") {
          currPosX--;
        }
      }
    }
  }
  return [currPosX, currPosY, coinsCollected];
}

module.exports.pacman = pacman;
