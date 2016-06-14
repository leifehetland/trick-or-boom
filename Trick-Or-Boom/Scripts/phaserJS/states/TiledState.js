var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.TiledState = function () {
    "use strict";
    Phaser.State.call(this);

    this.prefab_classes = {
        "player": TrickOrBoom.Player.prototype.constructor,
        "enemy": TrickOrBoom.Enemy.prototype.constructor
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

    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    // create map and set tileset
    this.map = this.game.add.tilemap(level_data.map.key);
    tileset_index = 0;
    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);
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

TrickOrBoom.TiledState.prototype.game_over = function () {
    "use strict";
    localStorage.clear();
    this.game.state.restart(true, false, this.level_data);
};
