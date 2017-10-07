using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(SignalR.StockTicker.Startup))]

namespace SignalR.StockTicker
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            

            app.UseCors(CorsOptions.AllowAll);
            var config = new Microsoft.AspNet.SignalR.HubConfiguration();
            config.EnableJSONP = true;
            // Enable cors and support jsonp

            app.MapSignalR();
        }
    }
}
