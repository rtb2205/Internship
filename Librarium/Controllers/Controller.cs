//using Helpers.AutoMapperProfiles;
//using Librarium.Models;
//using Librarium.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace Librarium.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public abstract class MyController<T> : ControllerBase where T : Service<T>
//    {
//        private readonly T _service;

//        public MyController(T service)
//        {
//            _service = service;
//        }

//        [HttpGet]
//        public async Task<ActionResult<List<T>>> GetAll()
//        {
//            return await _service.GetAll();
//        }

//        [HttpGet("{id}")]
//        public async Task<ActionResult<T>> Get(string id)
//        {
//            var result = await _service.Get(id);
//            if (result is null)
//                return NotFound($"{typeof(T).Name} not found.");
//            return Ok(result);
//        }

//        [HttpPost]
//        public async Task<ActionResult<List<T>>> Add(T item)
//        {
//            var newItem = AutoMapperProfiles.Transform<T, T>(item);
//            var result = await _service.Add(newItem);
//            return Ok(result);
//        }

//        [HttpPut("{id}")]
//        public async Task<ActionResult<List<T>>> Update(int id, T request)
//        {
//            var result = await _service.Update(id, request);
//            if (result is null)
//                return NotFound($"{typeof(T).Name} not found.");
//            return Ok(result);
//        }

//        [HttpDelete("{id}")]
//        public async Task<ActionResult<List<T>>> Delete(int id)
//        {
//            var result = await _service.Delete(id);
//            if (result is null)
//                return NotFound($"{typeof(T).Name} not found.");
//            return Ok(result);
//        }
//    }
//}
