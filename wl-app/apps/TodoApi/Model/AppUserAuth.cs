using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Model
{
  public class AppUserAuth
  {
    public AppUserAuth()
    {
      UserName = "Not authorized";
      BearerToken = string.Empty;
      Claims = new List<AppUserClaim>();
    }

    public string UserName { get; set; }
    public string BearerToken { get; set; }
    public bool IsAuthenticated { get; set; }
    public List<AppUserClaim> Claims { get; set; }
    //public bool CanAccessProducts { get; set; }
    //public bool CanAddProduct { get; set; }
    //public bool CanSaveProduct { get; set; }
    //public bool CanAccessCategories { get; set; }
    //public bool CanAddCategory { get; set; }
  }
}
