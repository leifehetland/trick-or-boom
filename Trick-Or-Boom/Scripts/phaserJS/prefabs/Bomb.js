var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.Bomb = function (game_state, name, position, properties) {
    "use strict";
    TrickOrBoom.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.bomb_radius = +properties.bomb_radius;

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;

    this.exploding_animation = this.animations.add("exploding", [0, 2, 4], 1, false);
    this.exploding_animation.onComplete.add(this.explode, this);
    this.animations.play("exploding");
};

TrickOrBoom.Bomb.prototype = Object.create(TrickOrBoom.Prefab.prototype);
TrickOrBoom.Bomb.prototype.constructor = TrickOrBoom.Bomb;

TrickOrBoom.Bomb.prototype.reset = function (position_x, position_y) {
    "use strict";
    Phaser.Sprite.prototype.reset.call(this, position_x, position_y);
    this.exploding_animation.restart();
};

TrickOrBoom.Bomb.prototype.explode = function () {
    "use strict";
    this.kill();
    var explosion_name, explosion_position, explosion_properties, explosion, wall_tile, block_tile;
    explosion_name = this.name + "_explosion_" + this.game_state.groups.explosions.countLiving();
    explosion_position = new Phaser.Point(this.position.x, this.position.y);
    explosion_properties = { texture: "explosion_image", group: "explosions", duration: 0.5 };
    explosion = TrickOrBoom.create_prefab_from_pool(this.game_state.groups.explosions, TrickOrBoom.Explosion.prototype.constructor, this.game_state,
                                                      explosion_name, explosion_position, explosion_properties);

    this.create_explosions(-1, -this.bomb_radius, -1, "x");
    this.create_explosions(1, this.bomb_radius, +1, "x");
    this.create_explosions(-1, -this.bomb_radius, -1, "y");
    this.create_explosions(1, this.bomb_radius, +1, "y");

    this.game_state.prefabs.player.current_bomb_index -= 1;
};

TrickOrBoom.Bomb.prototype.create_explosions = function (initial_index, final_index, step, axis) {
    "use strict";
    var index, explosion_name, explosion_position, explosion, explosion_properties, wall_tile, block_tile;
    explosion_properties = { texture: "explosion_image", group: "explosions", duration: 0.5 };
    for (index = initial_index; Math.abs(index) <= Math.abs(final_index) ; index += step) {
        explosion_name = this.name + "_explosion_" + this.game_state.groups.explosions.countLiving();
        if (axis === "x") {
            explosion_position = new Phaser.Point(this.position.x + (index * this.width), this.position.y);
        } else {
            explosion_position = new Phaser.Point(this.position.x, this.position.y + (index * this.height));
        }
        wall_tile = this.game_state.map.getTileWorldXY(explosion_position.x, explosion_position.y, this.game_state.map.tileWidth, this.game_state.map.tileHeight, "walls");
        block_tile = this.game_state.map.getTileWorldXY(explosion_position.x, explosion_position.y, this.game_state.map.tileWidth, this.game_state.map.tileHeight, "blocks");
        if (!wall_tile && !block_tile) {
            explosion = TrickOrBoom.create_prefab_from_pool(this.game_state.groups.explosions, TrickOrBoom.Explosion.prototype.constructor, this.game_state, explosion_name, explosion_position, explosion_properties);
        } else {
            if (block_tile) {
                this.check_for_item({ x: block_tile.x * block_tile.width, y: block_tile.y * block_tile.height },
                                    { x: block_tile.width, y: block_tile.height });
                this.game_state.map.removeTile(block_tile.x, block_tile.y, "blocks");
            }
            break;
        }
    }
};

TrickOrBoom.Bomb.prototype.check_for_item = function (block_position, block_size) {
    "use strict";
    var random_number, item_prefab_name, item, item_probability, item_name, item_position, item_properties, item_constructor, item_prefab;
    random_number = this.game_state.game.rnd.frac();
    for (item_prefab_name in this.game_state.items) {
        if (this.game_state.items.hasOwnProperty(item_prefab_name)) {
            item = this.game_state.items[item_prefab_name];
            item_probability = item.probability;
            if (random_number < item_probability) {
                item_name = this.name + "_items_" + this.game_state.groups[item.properties.group].countLiving();
                item_position = new Phaser.Point(block_position.x + (block_size.x / 2), block_position.y + (block_size.y / 2));
                console.log(item_position);
                item_properties = item.properties;
                item_constructor = this.game_state.prefab_classes[item_prefab_name];
                item_prefab = TrickOrBoom.create_prefab_from_pool(this.game_state.groups.items, item_constructor, this.game_state, item_name, item_position, item_properties);
                break;
            }
        }
    }
};