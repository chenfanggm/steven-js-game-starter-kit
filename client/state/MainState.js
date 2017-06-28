import Snake from '../entity/Snake'
import Food from '../entity/Food'


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
    audioContext: new AudioContext(),
    cursors: this.input.keyboard.createCursorKeys(),

    food: new Food(this, 3, 4),
    snake: new Snake(this, 8, 8)
  }
}

function update(time, delta) {
  const snake = this.global.snake
  const food = this.global.food
  const cursors = this.global.cursors

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
      food.reposition()
    }
  }
}

export default MainState
