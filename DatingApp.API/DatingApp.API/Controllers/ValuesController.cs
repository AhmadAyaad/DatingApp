using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DatingApp.API.Controllers
{
    [Route("api/[Controller]")]
    public class ValuesController : Controller
    {
        MyContext _context;
        public ValuesController(MyContext context)
        {
            _context = context;
        }


        // GET: /<controller>/
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Index(int id)
        {
            var value = await _context.Values.FindAsync(id);
            if (value != null)
                return Ok(value);
            return NotFound();
        }
    }
}
