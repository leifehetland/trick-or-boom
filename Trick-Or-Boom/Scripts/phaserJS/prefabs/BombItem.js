var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.BombItem = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.Item.call(this, game_state, name, position, properties);

    this.MAXIMUM_NUMBER_OF_BOMBS = 5;
};

TrickOrBoom.BombItem.prototype = Object.create(TrickOrBoom.Item.prototype);
TrickOrBoom.BombItem.prototype.constructor = TrickOrBoom.BombItem;

TrickOrBoom.BombItem.prototype.collect_item = function (item, player) {
    "use strict";
    TrickOrBoom.Item.prototype.collect_item.call(this);
    player.number_of_bombs = Math.min(player.number_of_bombs + 1, this.MAXIMUM_NUMBER_OF_BOMBS);
};