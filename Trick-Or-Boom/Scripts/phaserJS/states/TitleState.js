var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.TitleState = function () {
    "use strict";
    Phaser.State.call(this);
};

TrickOrBoom.TitleState.prototype = Object.create(Phaser.State.prototype);
TrickOrBoom.TitleState.prototype.constructor = TrickOrBoom.TitleState;

TrickOrBoom.TitleState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

TrickOrBoom.TitleState.prototype.create = function () {
    "use strict";
    var title_position, title_style, title, menu_position, menu_items, menu_properties, menu_item_name, menu_item, menu;

    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};

    title_position = new Phaser.Point(0.55 * this.game.world.width, 0.3 * this.game.world.height);
    title_style = { font: "36px Creepster", fill: "#FFF" };
    title = new TrickOrBoom.TextPrefab(this, "title", title_position, { text: "Trick or Boom!", style: title_style, group: "hud" });
    title.anchor.setTo(0.5);

    menu_position = new Phaser.Point(0, 0);
    menu_items = [];
    for (menu_item_name in this.level_data.menu_items) {
        if (this.level_data.menu_items.hasOwnProperty(menu_item_name)) {
            menu_item = this.level_data.menu_items[menu_item_name];
            menu_items.push(new TrickOrBoom.MenuItem(this, menu_item_name, menu_item.position, menu_item.properties));
        }
    }
    menu_properties = { texture: "", group: "background", menu_items: menu_items };
    menu = new TrickOrBoom.Menu(this, "menu", menu_position, menu_properties);
};