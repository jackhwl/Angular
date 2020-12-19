using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace PtcApi.Controllers
{
  public class BaseApiController : Controller
  {
    protected IActionResult HandleException(Exception ex, string msg)
    {
      IActionResult ret;

      // Create new exception with generic message        
      ret = StatusCode(
          StatusCodes.Status500InternalServerError, new Exception(msg, ex));

      return ret;
    }
  }
}
