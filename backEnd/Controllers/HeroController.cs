using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HeroModel;

namespace backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroController : ControllerBase
    {
        private readonly HeroContext _context;

        public HeroController(HeroContext context)
        {
            _context = context;
        }

        // GET: api/Hero
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hero>>> GetHeros()
        {   
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/Hero/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hero>> GetHero(long id)
        {
            var hero = await _context.TodoItems.FindAsync(id);

            if (hero == null)
            {
                return NotFound();
            }

            return hero;
        }

        // PUT: api/Hero/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHero(long id, Hero hero)
        {
            if (id != hero.id)
            {
                return BadRequest();
            }

            _context.Entry(hero).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Hero
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Hero>> PostHero(Hero hero)
        {
            _context.TodoItems.Add(hero);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetHero", new { id = hero.id , name=hero.name }, hero);
            return CreatedAtAction(nameof(GetHero), new { id = hero.id, name= hero.name }, hero);
        }

        // DELETE: api/Hero/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hero>> DeleteHero(long id)
        {
            var hero = await _context.TodoItems.FindAsync(id);
            if (hero == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(hero);
            await _context.SaveChangesAsync();

            return hero;
        }

        private bool HeroExists(long id)
        {
            return _context.TodoItems.Any(e => e.id == id);
        }
    }
}
