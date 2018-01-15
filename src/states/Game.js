/* globals __DEV__ */
import Phaser from 'phaser';
// import Mushroom from '../sprites/Mushroom';

export default class extends Phaser.State {
  init () {}
  preload () {

  }

  create () {
    // const bannerText = 'Robot Bomb Squad';
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // });

    // banner.padding.set(10, 16);
    // banner.anchor.setTo(0.5);

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // });

    // this.game.add.existing(this.mushroom);

    this.robot = this.game.add.sprite(20, 20, 'robot');
    this.robot.animations.add('idle', [1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
    this.robot.animations.add('walk', [10, 11, 12, 13, 14, 15, 16, 17], 12, true);
    this.robot.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25], 12, true);

    this.robot.animations.play('jump');
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
