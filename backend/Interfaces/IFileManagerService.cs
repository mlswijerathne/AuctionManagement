namespace DreamBid.Interfaces
{
    public interface IFileManagerService
    {
        public Task<string> StoreFile (IFormFile file, string subFilePath,ILogger logger, Boolean overWrite = false);
        public Task<byte[]> GetFile(string subFilePath);
        public Boolean RemoveFile(string subFilePath);

        public Boolean RemoveFileWithAnyExtension(string subFilePath);
    }
}