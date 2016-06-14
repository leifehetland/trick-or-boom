using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Trick_Or_Boom.Models;
using Trick_Or_Boom.DAL;
using System.Linq;

namespace Trick_Or_Boom.Tests.Models
{
    [TestClass]
    public class TimerTest
    {
        [TestMethod]
        public void TimerEnsureICanCreateAnInstance()
        {
            Timer t = new Timer();
            Assert.IsNotNull(t);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void TimerEnsureICanSaveTime()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            Timer t = new Timer();

            //Act
            context.GameTimer.Add(t);
            context.SaveChanges();

            //Assert
            Assert.AreEqual(1, context.GameTimer.Find().TimerId);

        }

        [TestMethod]
        public void TimerEnsureInstanceIsValid1()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            Timer t = new Timer();

            //Act
            t.Time = 5;
            context.GameTimer.Add(t);

            //Assert
            Assert.IsTrue(context.GameTimer.Count() > 1);
        }

        [TestMethod]
        public void TimerEnsureInstanceIsValid2()
        {
            //Arrange
            TrickOrBoomContext context = new TrickOrBoomContext();
            Timer t = new Timer();

            //Act
            t.Time = 307;
            context.GameTimer.Add(t);

            //Assert
            Assert.IsTrue(context.GameTimer.Count() > 1);
        }
    }
}
