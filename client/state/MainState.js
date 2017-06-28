import Snake from '../entity/Snake'
import Food from '../entity/Food'

let snake
let food
let cursors

const MainState = {
  preload: preload,
  create: create,
  update: update
}

function preload() {
  this.load.image('food', '/img/snake/food.png')
  this.load.image('body', '/img/snake/body.png')
}

function create() {
  this.global = {
    audioContext: new AudioContext()
  }
  food = new Food(this, 3, 4)
  snake = new Snake(this, 8, 8)

  //  Create our keyboard controls
  cursors = this.input.keyboard.createCursorKeys()
}

function update(time, delta) {
  if (!snake.alive) {
    return
  }

  /**
   * Check which key is pressed, and then change the direction the snake
   * is heading based on that. The checks ensure you don't double-back
   * on yourself, for example if you're moving to the right and you press
   * the LEFT cursor, it ignores it, because the only valid directions you
   * can move in at that time is up and down.
   */
  if (cursors.left.isDown) {
    snake.faceLeft()
  }
  else if (cursors.right.isDown) {
    snake.faceRight()
  }
  else if (cursors.up.isDown) {
    snake.faceUp()
  }
  else if (cursors.down.isDown) {
    snake.faceDown()
  }

  if (snake.update(time)) {
    //  If the snake updated, we need to check for collision against food

    if (snake.collideWithFood(food))
    {
      repositionFood()
    }
  }
}

/**
 * We can place the food anywhere in our 40x30 grid
 * *except* on-top of the snake, so we need
 * to filter those out of the possible food locations.
 * If there aren't any locations left, they've won!
 *
 * @method repositionFood
 * @return {boolean} true if the food was placed, otherwise false
 */
function repositionFood () {
  //  First create an array that assumes all positions
  //  are valid for the new piece of food

  //  A Grid we'll use to reposition the food each time it's eaten
  const testGrid = []

  for (let y = 0; y < 30; y++) {
    testGrid[y] = []

    for (let x = 0; x < 40; x++)
    {
      testGrid[y][x] = true
    }
  }

  snake.updateGrid(testGrid)

  //  Purge out false positions
  const validLocations = []

  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 40; x++)
    {
      if (testGrid[y][x] === true)
      {
        //  Is this position valid for food? If so, add it here ...
        validLocations.push({ x: x, y: y })
      }
    }
  }

  if (validLocations.length > 0) {
    //  Use the RNG to pick a random food position
    const pos = Phaser.Math.RND.pick(validLocations)

    //  And place it
    food.setPosition(pos.x * 16, pos.y * 16)

    return true
  } else {
    return false
  }
}

export default MainState
