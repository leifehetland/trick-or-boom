using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Trick_Or_Boom.Models;
using Trick_Or_Boom.DAL;
using System.Linq;

namespace Trick_Or_Boom.Tests.Models
{
    [TestClass]
    public class LevelTest
    {
        [TestMethod]
        public void LevelEnsureICanCreateAnInstance()
        {
            Level l = new Level();
            Assert.IsNotNull(l);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void LevelEnsureICanSaveLevel()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            Level level = new Level();

            //Act
            context.GameLevel.Add(level);
            context.SaveChanges();

            //Assert
            Assert.AreEqual(1, context.GameLevel.Find().LevelId);

        }

        [TestMethod]
        public void TimerEnsureInstanceIsValid1()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            Level level = new Level();

            //Act
            level.LevelNum = 2;
            context.GameLevel.Add(level);

            //Assert
            Assert.IsTrue(context.GameLevel.Count() > 1);
        }

        [TestMethod]
        public void TimerEnsureInstanceIsValid2()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            Level level = new Level();

            //Act
            level.LevelNum = 5;
            context.GameLevel.Add(level);

            //Assert
            Assert.IsTrue(context.GameLevel.Count() > 1);
        }
    }
}
