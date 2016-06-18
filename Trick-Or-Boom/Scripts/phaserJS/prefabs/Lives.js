var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.Lives = function (game_state, name, position, properties) {
    "use strict";
    var lives_text_position, lives_text_style, lives_text_properties;
    TrickOrBoom.Prefab.call(this, game_state, name, position, properties);

    this.player = properties.player;

    this.fixedToCamera = true;

    this.anchor.setTo(0.5);
    this.scale.setTo(0.6);

    lives_text_position = new Phaser.Point(this.position.x - 2, this.position.y + 5);
    lives_text_style = { font: "16px Creepster", fill: "#fff" };
    lives_text_properties = { group: "hud", text: this.number_of_lives, style: lives_text_style };
    this.lives_text = new TrickOrBoom.TextPrefab(this.game_state, "lives_text", lives_text_position, lives_text_properties);
    this.lives_text.anchor.setTo(0.5);
};

TrickOrBoom.Lives.prototype = Object.create(TrickOrBoom.Prefab.prototype);
TrickOrBoom.Lives.prototype.constructor = TrickOrBoom.Lives;

TrickOrBoom.Lives.prototype.update = function () {
    "use strict";
    this.lives_text.text = this.game_state.prefabs[this.player].number_of_lives;
};