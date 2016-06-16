var Phaser = Phaser || {};
var TrickOrBoom = TrickOrBoom || {};

TrickOrBoom.UserInput = function (game, parent, game_state, user_input_data) {
    "use strict";
    Phaser.Plugin.call(this, game, parent);
};

TrickOrBoom.UserInput.prototype = Object.create(Phaser.Plugin.prototype);
TrickOrBoom.UserInput.prototype.constructor = TrickOrBoom.UserInput;

TrickOrBoom.UserInput.prototype.init = function (game_state, user_input_data) {
    "use strict";
    var input_type, key, key_code;
    this.game_state = game_state;
    this.user_inputs = { "keydown": {}, "keyup": {}, "keypress": {} };

    for (input_type in user_input_data) {
        if (user_input_data.hasOwnProperty(input_type)) {
            for (key in user_input_data[input_type]) {
                if (user_input_data[input_type].hasOwnProperty(key)) {
                    key_code = Phaser.Keyboard[key];
                    this.user_inputs[input_type][key_code] = user_input_data[input_type][key];
                }
            }
        }
    }

    this.game.input.keyboard.addCallbacks(this, this.process_input, this.process_input, this.process_input);
};

TrickOrBoom.UserInput.prototype.process_input = function (event) {
    "use strict";
    var user_input, callback_data, prefab;
    if (this.user_inputs[event.type] && this.user_inputs[event.type][event.keyCode]) {
        user_input = this.user_inputs[event.type][event.keyCode];
        if (user_input) {
            callback_data = user_input.callback.split(".");
            prefab = this.game_state.prefabs[callback_data[0]];
            prefab[callback_data[1]].apply(prefab, user_input.args);
        }
    }
};