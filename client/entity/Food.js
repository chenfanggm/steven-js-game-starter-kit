const Food = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Food(state, x, y) {
    this.state = state
    Phaser.GameObjects.Image.call(this, state)

    this.setTexture('food')
    this.setPosition(x * 16, y * 16)
    this.setOrigin(0)

    this.total = 0

    this.eatEffect = {
      frequency: 523.25,
      attack: 0.05,
      decay: 0.2,
      type: 'sine',
      volume: 3,
      pan: 0.8,
      pitchBend: 600,
      reverse: true,
      random: 100
    }

    state.children.add(this)
  },

  eat() {
    this.total++
    new Phaser.Sound.Dynamic.FX(this.state.global.audioContext, this.eatEffect)
  },

  reposition() {
    const snake = this.state.global.snake

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
      this.setPosition(pos.x * 16, pos.y * 16)
      return true
    }

    return false
  }
})

export default Food
