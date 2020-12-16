using Microsoft.EntityFrameworkCore;

namespace PtcApi.Model
{
  public class PtcDbContext : DbContext
  {
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }

    // NOTE: Modify this connection string to point to where you installed the PTC database
    private const string CONN = @"Server=(localdb)\MSSQLLocalDB;Database=PTC;
    AttachDbFilename=D:\Samples\SqlData\PTC.mdf;MultipleActiveResultSets=true";

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(CONN);
    }
  }
}
