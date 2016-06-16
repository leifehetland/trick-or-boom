var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.Item = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;

    this.scale.setTo(0.75);
};

TrickOrBoom.Item.prototype = Object.create(TrickOrBoom.Prefab.prototype);
TrickOrBoom.Item.prototype.constructor = TrickOrBoom.Item;

TrickOrBoom.Item.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.collect_item, null, this);
};

TrickOrBoom.Item.prototype.collect_item = function () {
    "use strict";
    this.kill();
};