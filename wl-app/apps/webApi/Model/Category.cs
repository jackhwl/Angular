using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webApi.Model
{
  [Table("Category", Schema = "dbo")]
  public partial class Category
  {
    public int CategoryId { get; set; }

    [Required()]
    [StringLength(30)]
    public string CategoryName { get; set; }
  }
}
