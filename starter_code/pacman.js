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

function processFile(txtFile) {
  let data = fs.readFileSync(txtFile, "utf8").split("\n");

  if (!data[data.length - 1].length) data.pop();

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
      board[startPosY][startPosX] = "VISITED";
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
    // console.log(direction, currPosX, currPosY, board);
  }

  return [currPosX, currPosY, coinsCollected];
}

module.exports.pacman = pacman;
