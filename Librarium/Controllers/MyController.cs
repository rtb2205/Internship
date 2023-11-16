using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class MyController<T, RequestType, ResponseType, FilterType> : ControllerBase where T : Model where FilterType : class
    {
        protected readonly Service<T, FilterType> _service;

        public MyController(Service<T, FilterType> service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> Get(string id)
        {
            var result = await _service.Get<ResponseType>(id);
            if (result is null)
                return NotFound(new { Errors = new { Error = $"{typeof(T).Name} not found." } });
            //var newItem = AutoMapperProfile<T, ResponseType>.Transform(result);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public virtual async Task<IActionResult> Add(RequestType item)
        {
            //var newItem = _mapper.Map<T>(item);
            try
            {
                var result = await _service.Add<RequestType>(item);
                return Ok(new {Result = result});

            }
            catch (Exception ex)
            {
                return BadRequest(new { Errors = new { Error = ex.Message } });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public virtual async Task<IActionResult> Update(string id, RequestType request)
        {

            try
            {
                var result = await _service.Update(id, request);
                if (result is null)
                    return NotFound(new { Errors = new { Error =  $"{typeof(T).Name} not found." } });
                return Ok(new { Result = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Errors = new { Error = ex.Message } });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public virtual async Task<IActionResult> Delete(string id)
        {
            try
            {

                var result = await _service.Delete(id);
                if (result is null)
                    return NotFound($"{typeof(T).Name} not found.");
                return Ok(new { Result = result });
            }

            catch (Exception ex)
            {
                return BadRequest(new { Errors = new { Error = ex.Message } });
            }
        }
    }
}
