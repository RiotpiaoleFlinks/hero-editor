using Microsoft.EntityFrameworkCore;

namespace HeroModel
{
    public class HeroContext : DbContext
    {
        public HeroContext(DbContextOptions<HeroContext> options)
            : base(options)
        {
        }

        public DbSet<Hero> TodoItems { get; set; }
    }
}