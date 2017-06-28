const Food = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Food(state, x, y) {
    this.audioContext = state.global.audioContext
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

  eat: function () {
    this.total++
    new Phaser.Sound.Dynamic.FX(this.audioContext, this.eatEffect)
  }
})

export default Food
