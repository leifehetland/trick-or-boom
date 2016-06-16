var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.Menu = function (game_state, name, position, properties) {
    "use strict";
    var live_index, life;
    TrickOrBoom.Prefab.call(this, game_state, name, position, properties);

    this.visible = false;

    this.menu_items = properties.menu_items;
    this.current_item_index = 0;
    this.menu_items[0].selection_over();

    this.cursor_keys = this.game_state.game.input.keyboard.createCursorKeys();
};

TrickOrBoom.Menu.prototype = Object.create(TrickOrBoom.Prefab.prototype);
TrickOrBoom.Menu.prototype.constructor = TrickOrBoom.Menu;

TrickOrBoom.Menu.prototype.update = function () {
    "use strict";
    if (this.cursor_keys.up.isDown && this.current_item_index > 0) {
        this.menu_items[this.current_item_index].selection_out();
        this.current_item_index -= 1;
        this.menu_items[this.current_item_index].selection_over();
    } else if (this.cursor_keys.down.isDown && this.current_item_index < this.menu_items.length - 1) {
        this.menu_items[this.current_item_index].selection_out();
        this.current_item_index += 1;
        this.menu_items[this.current_item_index].selection_over();
    }

    if (this.game_state.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.menu_items[this.current_item_index].select();
    }
};