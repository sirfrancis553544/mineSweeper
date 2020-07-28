document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid"); // looking for class grid
  let width = 10;
  let bombAmount = Math.floor(Math.random() * 35) + 10;
  let squares = [];
  //   create board
  document.getElementById("num").innerHTML = bombAmount;

  function createBoard() {
    // get shffled gane array with random bombs
    const bombArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombArray); // combine bombs and empty
    const shuffleedArray = gameArray.sort(() => Math.random() - 0.5);
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div"); // creating 100 boxes
      square.setAttribute("id", i); // creating swaures and giving ID
      square.classList.add(shuffleedArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // normal class event listiner
      square.addEventListener("click", function (e) {
        click(square);
      });
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0; // not include left edge
      const isRightEdge = i % width === width - 1;
      if (squares[i].classList.contains("valid")) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;
        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
          total++;
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("bomb")
        )
          total++;
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        )
          total++;
        if (i < 89 && squares[i + width].classList.contains("bomb")) total++;

        squares[i].setAttribute("data", total);
      }
    }
  }
  createBoard();

  function click(square) {
    if (square.classList.contains("bomb")) {
      console.log("Game Over");
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
      square.classList.add("checked");
    }
  }
});
