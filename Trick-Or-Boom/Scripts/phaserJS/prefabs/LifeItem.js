var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.LifeItem = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.Item.call(this, game_state, name, position, properties);
};

TrickOrBoom.LifeItem.prototype = Object.create(TrickOrBoom.Item.prototype);
TrickOrBoom.LifeItem.prototype.constructor = TrickOrBoom.LifeItem;

TrickOrBoom.LifeItem.prototype.collect_item = function (item, player) {
    "use strict";
    TrickOrBoom.Item.prototype.collect_item.call(this);
    player.number_of_lives += 1;
};