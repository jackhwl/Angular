using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PtcApi.Model
{
  [Table("UserClaim", Schema = "Security")]
  public partial class AppUserClaim
  {
    [Required()]
    [Key()]
    public Guid ClaimId { get; set; }

    [Required()]
    public Guid UserId { get; set; }

    [Required()]
    [StringLength(100)]
    public string ClaimType { get; set; }

    [Required()]
    [StringLength(50)]
    public string ClaimValue { get; set; }
  }
}
