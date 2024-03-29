using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Security;
using TodoApi.Model;

namespace TodoApi.Controllers
{
  [Route("api/[controller]")]
  public class SecurityController : BaseApiController
  {
    private JwtSettings _settings;
    public SecurityController(JwtSettings settings)
    {
      _settings = settings;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] AppUser user)
    {
      IActionResult ret = null;
      AppUserAuth auth = new AppUserAuth();
      SecurityManager mgr = new SecurityManager(_settings);

      auth = mgr.AuthenticateUser(user);
      if (auth.IsAuthenticated)
      {
        ret = StatusCode(StatusCodes.Status200OK, auth);
      }
      else
      {
        ret = StatusCode(StatusCodes.Status401Unauthorized, "Invalid User Name/Password.");
      }

      return ret;
    }
  }
}
