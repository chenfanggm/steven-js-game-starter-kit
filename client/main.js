import './utils/normalize'
import './libs/phaser'
import config from './game.config'
import MainState from './states/MainState'

const game = new Phaser.Game({
  type: config.renderType,
  width: config.windowWidth,
  height: config.windowHeight,
  backgroundColor: config.backgroundColor,
  parent: 'root',
  state: MainState
})

if (__DEV__) {
  if (module.hot) {
    // Setup hot module replacement
    module.hot.accept()
  }
}

