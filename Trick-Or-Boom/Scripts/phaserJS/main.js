var TrickOrBoom = TrickOrBoom || {};

var game = new Phaser.Game(640, 480, Phaser.CANVAS);
game.state.add("BootState", new TrickOrBoom.BootState());
game.state.add("LoadingState", new TrickOrBoom.LoadingState());
game.state.add("TiledState", new TrickOrBoom.TiledState());
game.state.start("BootState", true, false, "Assets/levels/level1.json", "TiledState");
