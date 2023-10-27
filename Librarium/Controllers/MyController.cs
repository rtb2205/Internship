using AutoMapper;
using Azure.Core;
using Helpers.AutoMapperProfiles;
using Librarium.Models;
using Librarium.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public virtual async Task<ActionResult<List<T>>> GetAll([FromQuery]FilterType? filter = null)
        {
            return await _service.GetAll(filter);
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<T>> Get(string id)
        {
            var result = await _service.Get(id);
            if (result is null)
                return NotFound($"{typeof(T).Name} not found.");
            var newItem = AutoMapperProfile<T, ResponseType>.Transform(result);
            return Ok(newItem);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public virtual async Task<ActionResult<string?>> Add (RequestType item)
        {
            var newItem = AutoMapperProfile<RequestType, T>.Transform(item);
            var result = await _service.Add(newItem);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public virtual async Task<ActionResult<string?>> Update(string id, RequestType request)
        {
            var newItem = AutoMapperProfile<RequestType, T>.Transform(request);
            var result = await _service.Update(id, newItem);
            if (result is null)
                return NotFound($"{typeof(T).Name} not found.");
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public virtual async Task<ActionResult<List<T>>> Delete(string id)
        {
            var result = await _service.Delete(id);
            if (result is null)
                return NotFound($"{typeof(T).Name} not found.");
            return Ok(result);
        }
    }
}
