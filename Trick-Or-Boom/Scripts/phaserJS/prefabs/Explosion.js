var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.Explosion = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.duration = +properties.duration;

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;

    this.kill_timer = this.game_state.time.create(false);
    this.kill_timer.add(Phaser.Timer.SECOND * this.duration, this.kill, this);
    this.kill_timer.start();
};

TrickOrBoom.Explosion.prototype = Object.create(TrickOrBoom.Prefab.prototype);
TrickOrBoom.Explosion.prototype.constructor = TrickOrBoom.Explosion;

TrickOrBoom.Explosion.prototype.reset = function (position_x, position_y) {
    "use strict";
    Phaser.Sprite.prototype.reset.call(this, position_x, position_y);
    this.kill_timer.add(Phaser.Timer.SECOND * this.duration, this.kill, this);
};