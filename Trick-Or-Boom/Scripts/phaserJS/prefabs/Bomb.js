var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.Bomb = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.bomb_radius = +properties.bomb_radius;

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;

    this.exploding_animation = this.animations.add("exploding", [0, 2, 4], 1, false);
}