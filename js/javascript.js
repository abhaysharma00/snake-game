console.log("hello")
const board = document.getElementById("board");
let snake = [{ x: 13, y: 13 }];
let food = {
  x: 11,
  y: 7,
};
const input = {
  x: 0,
  y: 0,
};
let lastinput = {
  x: 0,
  y: 0, // phele const set kiya tha ab let set kiya to change hua
};
let lastPainttime = 0;



document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    if (lastinput.y == 0) {
      (input.x = 0), (input.y = -1);
    }
  } else if (e.key == "ArrowDown") {
    if (lastinput.y == 0) {
      (input.x = 0), (input.y = 1);
    }
  } else if (e.key == "ArrowLeft") {
    if (lastinput.x == 0) {
      (input.x = -1), (input.y = 0);
    }
  } else if (e.key == "ArrowRight") {
    if (lastinput.x == 0) {
      (input.x = 1), (input.y = 0);
    }
  }
  lastinput = input;
});
let gameover = false;

//inputting the variable for speed by increasing the refresh rate
let ct=10;

// trying to fetch values for speed
function setspeed(value)
{
  ct=value;
  console.log(ct);
  
}
// console.log(b1,b2,b3);

function main(ctime) {
  if (gameover) {
    alert("lol");
    return;
  }
  window.requestAnimationFrame(main);
  if ((ctime - lastPainttime) / 1000 < 1 / ct) {
    return;
  }
  lastPainttime = ctime;
  draw();
  update();
  gameover = (checkgame() || checkintersection())
}
window.requestAnimationFrame(main);

// utility functions

function update() {
  for (let i = snake.length - 2; i >= 0; i--) snake[i + 1] = { ...snake[i] };
  snake[0].x += input.x;
  snake[0].y += input.y;

  snake.map((value) => {
    if (value.x == food.x && value.y == food.y) {
      increase();
      getrandom();
    }
  });
}

function draw() {
  board.innerHTML = "";
  showfood();
  snake.map((value) => {
    const snake_element = document.createElement("div");
    snake_element.classList.add("snake");
    snake_element.style.gridColumnStart = value.x;
    snake_element.style.gridRowStart = value.y;
    board.appendChild(snake_element);
  });
}

function showfood() {
  foodout = document.createElement("div");
  foodout.classList.add("food");
  foodout.style.gridRowStart = food.y;
  foodout.style.gridColumnStart = food.x;
  board.appendChild(foodout);
}

function increase() {
  snake.push({ food });
}

function getrandom() {
  food.x = Math.floor(Math.random() * 25) + 1;
  food.y = Math.floor(Math.random() * 25) + 1;

  if (eaten()) {
    getrandom();
  }
}

function eaten() {
  snake.map((value) => {
    if (value.x == food.x && value.y == food.y) {
      return true;
    }
  });
  return false;
}

function checkgame() {
  if (
    snake[0].x == 0 ||
    snake[0].y == 0 ||
    snake[0].x == 26 ||
    snake[0].y == 26
  )
    return true;
}

function checkintersection() {
  for (i = 1; i < snake.length; i++)
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) return true;
}
