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

  cursors = this.input.keyboard.createCursorKeys()
}

function update(time, delta) {
  if (!snake.alive) return

  if (cursors.left.isDown) {
    snake.faceLeft()
  } else if (cursors.right.isDown) {
    snake.faceRight()
  } else if (cursors.up.isDown) {
    snake.faceUp()
  } else if (cursors.down.isDown) {
    snake.faceDown()
  }

  if (snake.update(time)) {
    if (snake.collideWithFood(food)) {
      repositionFood()
    }
  }
}

function repositionFood() {
  const testGrid = []

  for (let y = 0; y < 30; y++) {
    testGrid[y] = []
    for (let x = 0; x < 40; x++) {
      testGrid[y][x] = true
    }
  }

  snake.updateGrid(testGrid)

  const validLocations = []

  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 40; x++) {
      if (testGrid[y][x] === true) {
        validLocations.push({ x: x, y: y })
      }
    }
  }

  if (validLocations.length > 0) {
    const pos = Phaser.Math.RND.pick(validLocations)
    food.setPosition(pos.x * 16, pos.y * 16)
    return true
  }

  return false
}

export default MainState
