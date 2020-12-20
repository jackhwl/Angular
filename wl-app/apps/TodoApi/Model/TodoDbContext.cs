using Microsoft.EntityFrameworkCore;

namespace TodoApi.Model
{
  public class TodoDbContext : DbContext
  {
    //public TodoDbContext(DbContextOptions<TodoDbContext> options)
    //       : base(options)
    //{
    //}

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<AppUser> Users { get; set; }
    public DbSet<AppUserClaim> Claims { get; set; }

    // NOTE: Modify this connection string to point to where you installed the PTC database
    private const string CONN = @"Server=(localdb)\MSSQLLocalDB;Database=PTC;
    AttachDbFilename=C:\Jack\Projects\Angular\wl-app\apps\SqlData\PTC.mdf;MultipleActiveResultSets=true";

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(CONN);
    }
  }
}
