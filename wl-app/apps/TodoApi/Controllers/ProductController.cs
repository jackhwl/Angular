using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using TodoApi.Model;
using Microsoft.AspNetCore.Authorization;

namespace TodoApi.Controllers
{
  [Route("api/[controller]")]
  public class ProductController : BaseApiController
  {
    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
      IActionResult ret = null;
      List<Product> list = new List<Product>();

      try
      {
        using (var db = new TodoDbContext())
        {
          if (db.Products.Count() > 0)
          {
            list = db.Products.OrderBy(p => p.ProductName).ToList();
            ret = StatusCode(StatusCodes.Status200OK, list);
          }
          else
          {
            ret = StatusCode(StatusCodes.Status404NotFound, "Can't Find Products");
          }
        }
      }
      catch (Exception ex)
      {
        ret = HandleException(ex, "Exception trying to get all products");
      }

      return ret;
    }

    [HttpGet("{id}", Name = "Get")]
    public IActionResult Get(int id)
    {
      IActionResult ret = null;
      Product entity = null;

      try
      {
        using (var db = new TodoDbContext())
        {
          entity = db.Products.Find(id);
          if (entity != null)
          {
            ret = StatusCode(StatusCodes.Status200OK, entity);
          }
          else
          {
            ret = StatusCode(StatusCodes.Status404NotFound,
                     "Can't Find Product: " + id.ToString());
          }
        }
      }
      catch (Exception ex)
      {
        ret = HandleException(ex,
          "Exception trying to retrieve a single product.");
      }

      return ret;
    }
  }
}
