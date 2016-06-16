var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.Goal = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);
    this.scale.setTo(0.5);

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

TrickOrBoom.Goal.prototype = Object.create(TrickOrBoom.Prefab.prototype);
TrickOrBoom.Goal.prototype.constructor = TrickOrBoom.Goal;

TrickOrBoom.Goal.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

TrickOrBoom.Goal.prototype.reach_goal = function () {
    "use strict";
    this.game_state.next_level();
};