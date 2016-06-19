using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Trick_Or_Boom.Models;
using Trick_Or_Boom.DAL;
using System.Linq;

namespace Trick_Or_Boom.Tests.Models
{
    [TestClass]
    public class GameStateTest
    {
        [TestMethod]
        public void LevelEnsureICanCreateAnInstance()
        {
            GameState g = new GameState();
            Assert.IsNotNull(g);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void LevelEnsureICanSaveLevel()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            GameState g = new GameState();

            //Act
            context.GameState.Add(g);
            context.SaveChanges();

            //Assert
            Assert.AreEqual(1, context.GameState.Find().LevelNum);

        }

        [TestMethod]
        public void LevelEnsureInstanceIsValid1()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            GameState g = new GameState();

            //Act
            g.LevelNum = 2;
            context.GameState.Add(g);

            //Assert
            Assert.IsTrue(context.GameState.Count() > 1);
        }

        [TestMethod]
        public void LevelEnsureInstanceIsValid2()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            GameState g = new GameState();

            //Act
            g.LevelNum = 5;
            context.GameState.Add(g);

            //Assert
            Assert.IsTrue(context.GameState.Count() > 1);
        }
    }
}
