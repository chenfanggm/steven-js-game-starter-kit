// Direction consts
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3

const Snake = new Phaser.Class({

  initialize: function Snake(state, x, y) {
    this.state = state
    this.layer = state.add.layer()

    this.alive = true

    this.headPosition = new Phaser.Geom.Point(x, y)
    this.head = this.layer.create(x * 16, y * 16, 'body')
    this.head.setOrigin(0)

    this.tail = new Phaser.Geom.Point(x, y)

    this.heading = RIGHT
    this.direction = RIGHT
    this.speed = 100
    this.moveTime = 0

    this.deathEffect = {
      frequency: 16,
      decay: 1,
      type: 'sawtooth',
      dissonance: 50
    }
  },

  update: function (time) {
    if (time >= this.moveTime) {
      return this.move(time)
    }
  },

  move: function (time) {
    switch (this.heading) {
      case LEFT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40)
        break

      case RIGHT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40)
        break

      case UP:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30)
        break

      case DOWN:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30)
        break
    }

    this.direction = this.heading
    // Update the body segments and place the last coordinate into this.tail
    this.layer.shiftPosition(this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail)

    const hitBody = this.layer.getFirst({ x: this.head.x, y: this.head.y }, 1)
    if (hitBody) {
      //  Game Over
      new Phaser.Sound.Dynamic.FX(this.state.global.audioContext, this.deathEffect)
      this.alive = false

      return false
    } else {
      //  Update the timer ready for the next movement
      this.moveTime = time + this.speed
      return true
    }
  },

  faceLeft: function () {
    if (this.direction === UP || this.direction === DOWN) {
      this.heading = LEFT
    }
  },

  faceRight: function () {
    if (this.direction === UP || this.direction === DOWN) {
      this.heading = RIGHT
    }
  },

  faceUp: function () {
    if (this.direction === LEFT || this.direction === RIGHT) {
      this.heading = UP
    }
  },

  faceDown: function () {
    if (this.direction === LEFT || this.direction === RIGHT) {
      this.heading = DOWN
    }
  },

  collideWithFood: function (food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow()
      food.eat()

      if (this.speed > 20 && food.total % 5 === 0) {
        this.speed -= 5
      }

      return true
    }

    return false
  },

  grow: function () {
    const newPart = this.layer.create(this.tail.x, this.tail.y, 'body')
    newPart.setOrigin(0)
  },

  updateGrid: function (grid) {
    this.layer.children.each(function (segment) {
      const bx = segment.x / 16
      const by = segment.y / 16
      grid[by][bx] = false
    })

    return grid
  }
})

export default Snake
