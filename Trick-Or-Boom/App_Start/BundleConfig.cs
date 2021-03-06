﻿using System.Web;
using System.Web.Optimization;

namespace Trick_Or_Boom
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/lib/phaser").Include(
                     "~/bower_components/phaser/build/phaser.js",
                     "~/bower_components/phaser/src/pixi/Pixi.js",
                     "~/bower_components/phaser/src/physics/p2.js"
                     ));

            bundles.Add(new ScriptBundle("~/bundle/phaser").Include(
                      "~/Scripts/phaserJS/Utils.js",
                      "~/Scripts/phaserJS/UserInput.js",
                      "~/Scripts/phaserJS/states/BootState.js",
                      "~/Scripts/phaserJS/states/LoadingState.js",
                      "~/Scripts/phaserJS/states/TitleState.js",
                      "~/Scripts/phaserJS/states/TiledState.js",
                      "~/Scripts/phaserJS/states/StartGameState.js",
                      "~/Scripts/phaserJS/prefabs/Prefab.js",
                      "~/Scripts/phaserJS/prefabs/TextPrefab.js",
                      "~/Scripts/phaserJS/prefabs/Player.js",
                      "~/Scripts/phaserJS/prefabs/Bomb.js",
                      "~/Scripts/phaserJS/prefabs/Explosion.js",
                      "~/Scripts/phaserJS/prefabs/Enemy.js",
                      "~/Scripts/phaserJS/prefabs/Target.js",
                      "~/Scripts/phaserJS/prefabs/Goal.js",
                      "~/Scripts/phaserJS/prefabs/Item.js",
                      "~/Scripts/phaserJS/prefabs/LifeItem.js",
                      "~/Scripts/phaserJS/prefabs/BombItem.js",
                      "~/Scripts/phaserJS/prefabs/Lives.js",
                      "~/Scripts/phaserJS/prefabs/MenuItem.js",
                      "~/Scripts/phaserJS/prefabs/Menu.js",
                      "~/Scripts/phaserJS/prefabs/GameOverPanel.js",

                      "~/Scripts/phaserJS/main.js"
                      ));

            
        }
    }
}
