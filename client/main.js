import './phaser'
import config from './phaser.config'
import MainState from './state/MainState'

const game = new Phaser.Game({
  type: config.renderType,
  width: config.windowWidth,
  height: config.windowHeight,
  backgroundColor: config.backgroundColor,
  parent: 'root',
  state: MainState
})

// Development Tools
if (__DEV__) {
  if (module.hot) {
    // Setup hot module replacement
    module.hot.accept('./main', () =>
      setImmediate(() => {
      })
    )
  }
}
