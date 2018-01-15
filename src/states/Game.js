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

        this.robotScale = 0.7;
        this.gravity = 500;
        this.jump = 200;
        this.numberOfMonsters = 10;

        // this.game.add.existing(this.mushroom);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.robot = this.game.add.sprite(20, 20, 'robot');

        this.robot.scale.x = this.robotScale;
        this.robot.scale.y = this.robotScale;
        this.robot.animations.add('idle', [1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
        this.robot.animations.add('walk', [10, 11, 12, 13, 14, 15, 16, 17], 12, true);
        this.robot.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25], 12, true);

        this.robot.animations.play('idle');
        this.robot.anchor.set(0.5, 0.5);

        this.monsterGroup = this.game.add.group();
        this.monsterGroup.createMultiple(20, 'monster');

        // enable physics on the robot
        this.physics.arcade.enable([this.robot, this.monsterGroup]);
        this.robot.body.gravity.y = this.gravity;
        this.robot.body.bounce.set(0.05);
        this.robot.body.collideWorldBounds = true;

        // create map
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles');

        // layer
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        this.map.setCollisionBetween(0, 24);

        this.game.camera.follow(this.robot);

        this.cursor = this.game.input.keyboard.createCursorKeys();

        this.map.setTileIndexCallback(25, this.getBomb, this);

        this.createMonsters();
    }

    update () {
        this.physics.arcade.collide(this.robot, this.layer);
        this.physics.arcade.collide(this.monsterGroup, this.layer);
        this.physics.arcade.collide(this.monsterGroup, this.layer, null, this.reverseMonster);

        if (Math.abs(this.robot.body.velocity.x) > 0 && this.robot.body.onFloor()) {
            this.robot.animations.play('walk');
        } else {
            this.robot.animations.play('idle');
        }

        if (this.robot.body.velocity.x > 0) {
            this.robot.scale.x = this.robotScale;
        } else {
            this.robot.scale.x = -this.robotScale;
        }

        if (this.cursor.left.isDown) {
            this.robot.body.velocity.x = -250;
        }

        // Walk right
        if (this.cursor.right.isDown) {
            this.robot.body.velocity.x = 250;
        }

        // walk left
        if (this.cursor.right.isUp && this.cursor.left.isUp) {
            this.robot.body.velocity.x = 0;
        }

        // Jump
        if (this.cursor.up.isDown) {
            if (this.robot.body.onFloor()) {
                this.robot.body.velocity.y = -Math.abs(this.robot.body.velocity.x) - this.jump;
            }
            this.robot.animations.play('jump');
        }
    }

    render () {
        if (__DEV__) {
            this.game.debug.bodyInfo(this.robot, 20, 20);
        }
    }

    getBomb (sprite, tile) {
        if (sprite.name === 'monster') return;
        this.map.removeTile(tile.x, tile.y, this.layer);
    }

    reverseMonster (monster, layer) {
        if (monster.body.blocked.left) {
            monster.body.velocity.x = 100;
            monster.scale.x = -1;
        }

        if (monster.body.blocked.right) {
            monster.body.velocity.x = -100;
            monster.scale.x = 1;
        }
    }

    createMonsters () {
        for (let i = 0; i < this.numberOfMonsters; i++) {
            const monster = this.monsterGroup.getFirstDead();
            const xx = this.game.rnd.integerInRange(0, this.game.world.width);
            monster.reset(xx, 50);
            monster.enable = true;
            monster.body.velocity.x = -100;
            monster.body.velocity.y = 200;
            monster.body.gravity.y = 200;
            monster.body.collideWorldBounds = true;
            monster.name = 'monster';

            monster.animations.add('move', [0,1], 12, true);
            monster.animations.play('move');
        }
    }
}
