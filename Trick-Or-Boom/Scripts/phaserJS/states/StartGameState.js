var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.StartGameState = function () {
    "use strict";
    TrickOrBoom.TiledState.call(this);
};

TrickOrBoom.StartGameState.prototype = Object.create(TrickOrBoom.TiledState.prototype);
TrickOrBoom.StartGameState.prototype.constructor = TrickOrBoom.StartGameState;

TrickOrBoom.StartGameState.prototype.init_hud = function () {
    "use strict";
    var player_lives_position, player_lives_properties, player_lives;

    player_lives_position = new Phaser.Point(0.1 * this.game.world.width, 0.035 * this.game.world.height);
    player_lives_properties = { group: "hud", texture: "lives_image", number_of_lives: 3, player: "player" };
    player_lives = new TrickOrBoom.Lives(this, "lives", player_lives_position, player_lives_properties);
};

TrickOrBoom.StartGameState.prototype.game_over = function () {
    "use strict";
    this.game.state.start("BootState", true, false, "assets/levels/level1.json", "StartGameState");
};

TrickOrBoom.StartGameState.prototype.next_level = function () {
    "use strict";
    localStorage.number_of_lives = this.prefabs.player.number_of_lives;
    localStorage.number_of_bombs = this.prefabs.player.number_of_bombs;
    this.game.state.start("BootState", true, false, this.level_data.next_level, "StartGameState");
};
