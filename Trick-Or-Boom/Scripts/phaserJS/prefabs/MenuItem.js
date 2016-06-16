var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.MenuItem = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.TextPrefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.on_selection_animation = this.game_state.game.add.tween(this.scale);
    this.on_selection_animation.to({ x: 1.5 * this.scale.x, y: 1.5 * this.scale.y }, 500);
    this.on_selection_animation.to({ x: this.scale.x, y: this.scale.y }, 500);
    this.on_selection_animation.repeatAll(-1);

    this.level_file = properties.level_file;
    this.state_name = properties.state_name;
};

TrickOrBoom.MenuItem.prototype = Object.create(TrickOrBoom.TextPrefab.prototype);
TrickOrBoom.MenuItem.prototype.constructor = TrickOrBoom.MenuItem;

TrickOrBoom.MenuItem.prototype.selection_over = function () {
    "use strict";
    if (this.on_selection_animation.isPaused) {
        this.on_selection_animation.resume();
    } else {
        this.on_selection_animation.start();
    }
};

TrickOrBoom.MenuItem.prototype.selection_out = function () {
    "use strict";
    this.on_selection_animation.pause();
};

TrickOrBoom.MenuItem.prototype.select = function () {
    "use strict";
    this.game_state.state.start("BootState", true, false, this.level_file, this.state_name);
};