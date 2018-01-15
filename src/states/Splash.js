import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
    init () {}

    preload () {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);
        //
        // load your assets
        //
        // this.load.image('mushroom', 'assets/images/mushroom2.png');

        // Robot
        this.load.spritesheet('robot', 'assets/images/main/robot.png', 80, 111, 28);

        // Map
        this.load.tilemap('map', 'assets/maps/robotMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/tiles.png');
        this.load.spritesheet('monster', 'assets/images/main/monsters.png', 50, 50, 2);
    }

    create () {
        this.state.start('Game');
    }
}
