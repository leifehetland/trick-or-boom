using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Trick_Or_Boom.Startup))]
namespace Trick_Or_Boom
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
