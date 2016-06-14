using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Trick_Or_Boom.DAL;
using System.Linq;
using System.Data.Entity;

namespace Trick_Or_Boom.Tests.DAL
{
    [TestClass]
    public class TrickOrBoomRepositoryTest
    {
        [TestMethod]
        public void RepoEnsureICanCreateAnInstance()
        {
            TrickOrBoomRepository repo = new TrickOrBoomRepository();
            Assert.IsNotNull(repo);
        }

        [TestMethod]
        public void RepoEnsureIsUsingContext()
        {
            //Arrange
            TrickOrBoomRepository repo = new TrickOrBoomRepository();

            //Assert
            Assert.IsNotNull(repo.context);
        }
    }
}
