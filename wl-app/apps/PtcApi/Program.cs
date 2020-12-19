using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace PtcApi
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = new HostBuilder()
          .ConfigureAppConfiguration((hostContext, configApp) =>
          {
            configApp.SetBasePath(Directory.GetCurrentDirectory());
            configApp.AddJsonFile("appsettings.json", optional: true);
            configApp.AddJsonFile(
          $"appsettings.{hostContext.HostingEnvironment.EnvironmentName}.json",
          optional: true);
            configApp.AddEnvironmentVariables(prefix: "PREFIX_");
            configApp.AddCommandLine(args);
          });
    }

    //public static IHostBuilder CreateHostBuilder(string[] args) =>
    //  Host.CreateDefaultBuilder(args)
    //    ..ConfigureWebHostDefaults(webBuilder =>
    //    {
    //      webBuilder.UseStartup<Startup>();
    //    });
  }
}
