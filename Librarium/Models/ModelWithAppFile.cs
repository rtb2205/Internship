namespace Librarium.Models
{
    public abstract class ModelWithAppFile: Model
    {
        public string? AppFileId { get; set; }
        public AppFile? AppFile { get; set; }
    }
}
