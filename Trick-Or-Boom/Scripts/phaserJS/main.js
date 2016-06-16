var TrickOrBoom = TrickOrBoom || {};

var game = new Phaser.Game(400, 400, Phaser.CANVAS);
game.state.add("BootState", new TrickOrBoom.BootState());
game.state.add("LoadingState", new TrickOrBoom.LoadingState());
game.state.add("TitleState", new TrickOrBoom.TitleState());
game.state.add("StartGameState", new TrickOrBoom.StartGameState());
game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState");