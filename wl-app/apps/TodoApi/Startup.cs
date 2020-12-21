using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using TodoApi.Model;

namespace TodoApi
{
  public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
      // Get JWT Settings from JSON file
      JwtSettings settings;
      settings = GetJwtSettings();
      services.AddSingleton<JwtSettings>(settings);

      // Register Jwt as the Authentication service
      //services.AddAuthentication(options =>
      //{
      //  options.DefaultAuthenticateScheme = "Bearer";
      //  options.DefaultChallengeScheme = "Bearer";
      //})
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(jwtBearerOptions =>
      {
        jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
            {
              ValidateIssuerSigningKey = true,
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Key)),
              ValidateIssuer = true,
              ValidIssuer = settings.Issuer,

              ValidateAudience = true,
              ValidAudience = settings.Audience,

              ValidateLifetime = true,
              ClockSkew = TimeSpan.FromMinutes(settings.MinutesToExpiration)
            };
      });

      services.AddCors();

      services.AddMvc();
//.AddJsonOptions(options =>
//  options.SerializerSettings.ContractResolver =
//new CamelCasePropertyNamesContractResolver());

      services.AddControllers();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

      app.UseCors(
        options => options.WithOrigins(
        "http://localhost:4200").AllowAnyMethod().AllowAnyHeader()
      );

      app.UseAuthorization();
      //app.UseJwtBearerAuthentication();


      app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

    }

    public JwtSettings GetJwtSettings()
    {
      JwtSettings settings = new JwtSettings();
      settings.Key = Configuration["JwtSettings:key"];
      settings.Audience = Configuration["JwtSettings:audience"];
      settings.Issuer = Configuration["JwtSettings:issuer"];
      settings.MinutesToExpiration = Convert.ToInt32(Configuration["JwtSettings:minutesToExpiration"]);

      return settings;
    }
  }
}
