var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.TiledState = function () {
    "use strict";
    Phaser.State.call(this);

    this.prefab_classes = {
        "player": TrickOrBoom.Player.prototype.constructor,
        "enemy": TrickOrBoom.Enemy.prototype.constructor,
        "target": TrickOrBoom.Target.prototype.constructor,
        "life_item": TrickOrBoom.LifeItem.prototype.constructor,
        "bomb_item": TrickOrBoom.BombItem.prototype.constructor
    };

    this.items = {
        life_item: { probability: 0.1, properties: { texture: "life_item_image", group: "items" } },
        bomb_item: { probability: 0.3, properties: { texture: "bomb_item_image", group: "items" } }
    };
};

TrickOrBoom.TiledState.prototype = Object.create(Phaser.State.prototype);
TrickOrBoom.TiledState.prototype.constructor = TrickOrBoom.TiledState;

TrickOrBoom.TiledState.prototype.init = function (level_data) {
    "use strict";
    var tileset_index;
    this.level_data = level_data;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    this.map = this.game.add.tilemap(level_data.map.key);
    tileset_index = 0;
    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);

    if (this.level_data.first_level) {
        localStorage.clear();
    }
};

TrickOrBoom.TiledState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;

    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) {
            collision_tiles = [];
            layer.data.forEach(function (data_row) {
                data_row.forEach(function (tile) {
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);
    this.layers[this.map.layer.name].resizeWorld();

    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};

    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }

    this.game.user_input = this.game.plugins.add(TrickOrBoom.UserInput, this, JSON.parse(this.game.cache.getText("user_input")));

    this.init_hud();
};

TrickOrBoom.TiledState.prototype.create_object = function (object) {
    "use strict";
    var object_y, position, prefab;
    object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
    position = { "x": object.x + (this.map.tileHeight / 2), "y": object_y };
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
    }
    this.prefabs[object.name] = prefab;
};

TrickOrBoom.TiledState.prototype.init_hud = function () {
    "use strict";
    var lives_position, lives_properties, lives;

    lives_position = new Phaser.Point(0.5 * this.game.world.width, 0.04 * this.game.world.height);
    lives_properties = { group: "hud", texture: "lives_image", number_of_lives: 3 };
    lives = new TrickOrBoom.Lives(this, "lives", lives_position, lives_properties);
};

TrickOrBoom.TiledState.prototype.show_game_over = function () {
    "use strict";
    var game_over_panel, game_over_position, game_over_bitmap, panel_text_style;
    game_over_position = new Phaser.Point(0, this.game.world.height);
    game_over_bitmap = this.add.bitmapData(this.game.world.width, tihs.game.world.height);
    game_over_bitmap.ctx.fillStyle = "#000";
    game_over_bitmap.ctx.fillRect(0, 0, this.game.world.width, this.game.world.height);
    panel_text_style = {
        game_over: { font: "32px Creepster", fill: "#FFF" },
        winner: { font: "20px Creepster", fill: "#FFF" }
    };

    game_over_panel = this.create_game_over_panel(game_over_position, game_over_bitmap, panel_text_style);
    this.groups.hud.add(game_over_panel);
};

TrickOrBoom.TiledState.prototype.create_game_over_panel = function (position, texture, text_style) {
    "use strict";
    var game_over_panel_properties, game_over_panel;
    game_over_panel_properties = { texture: texture, group: "hud", text_style: text_style, animation_time: 500 };
    game_over_panel = new TrickOrBoom.GameOverPanel(this, "game_over_panel", position, game_over_panel_properties);
    return game_over_panel;
};

TrickOrBoom.TiledState.prototype.next_level = function () {
    "use strict";
    localStorage.number_of_lives = this.prefabs.player.number_of_lives;
    localStorage.number_of_bombs = this.prefabs.player.number_of_bombs;
    this.game.state.start("BootState", true, false, this.level_data.next_level, "TiledState");
};
