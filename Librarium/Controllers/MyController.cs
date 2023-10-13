using Azure.Core;
using Helpers.AutoMapperProfiles;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Librarium.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class MyController<T, RequestType, ResponseType, FilterType> : ControllerBase where T : class where FilterType : class
    {
        private readonly Service<T, FilterType> _service;
        public MyController(Service<T, FilterType> service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<T>>> GetAll([FromQuery]FilterType? filter = null)
        {
            return await _service.GetAll(filter);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<T>> Get(string id)
        {
            var result = await _service.Get(id);
            if (result is null)
                return NotFound($"{typeof(T).Name} not found.");
            var newItem = AutoMapperProfiles.Transform<T, ResponseType>(result);
            return Ok(newItem);
        }

        [HttpPost]
        public async Task<ActionResult<List<T>>> Add (RequestType item)
        {
            var newItem = AutoMapperProfiles.Transform<RequestType, T>(item);
            var result = await _service.Add(newItem);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<T>>> Update(string id, RequestType request)
        {
            var newItem = AutoMapperProfiles.Transform<RequestType, T>(request);
            var result = await _service.Update(id, newItem);
            if (result is null)
                return NotFound($"{typeof(T).Name} not found.");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<T>>> Delete(string id)
        {
            var result = await _service.Delete(id);
            if (result is null)
                return NotFound($"{typeof(T).Name} not found.");
            return Ok(result);
        }
    }
}
