namespace DreamBid.Utils
{
    public class FileManagementUtil
    {
        /// <summary>
        /// This will convert any given full, relative or just a string to os specific path. Which mean this method is not going to validate the path. it only replate the directory seperators in the given path to os specific directory seperator
        /// </summary>
        /// <param name="path">Full, Relative or any string</param>
        /// <returns>Os specific string</returns>
        public static string GetOsDependentPath(string path)
        {
            return path.Replace('\\', Path.DirectorySeparatorChar).Replace('/', Path.DirectorySeparatorChar);
        }

        /// <summary>
        /// This will delete the file. It need an absolute file path to delete it.
        /// </summary>
        /// <param name="absFilePath">Absolute file path</param>
        /// <returns>Boolean. If failed to delete or error occoured when deleting this will return False.</returns>
        public static Boolean DeleteFile(string absFilePath)
        {
            if (absFilePath == null) return false;
            try
            {
                if (!File.Exists(absFilePath)) return false;
                File.Delete(absFilePath);
            }
            catch (Exception e)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Delete list of files
        /// </summary>
        /// <param name="absFilePaths">Should give list of absolute file path names list</param>
        /// <returns>Return true if all the files deleted successfully and return false if one of the file cannot delete</returns>
        public static Boolean DeleteFiles(string[] absFilePaths)
        {
            foreach (string fileName in absFilePaths)
            {
                var result = FileManagementUtil.DeleteFile(fileName);
                if (!result) return result;
            }
            return true;
        }

        /// <summary>
        /// Find the every file in the given file path with the file baes name
        /// </summary>
        /// <param name="absFilePath">This should be a file path and it should be an absolute path</param>
        /// <returns>List of files that found. If not found anything the return array length is 0</returns>
        public static string[] FindFilesWithAnyExtension(string absFilePath)
        {
            var FileNames = new string[0];
            if (absFilePath == null) return FileNames;

            var fileBaseNamePattern = $"{Path.GetFileNameWithoutExtension(absFilePath)}.*";
            var directoryPath = Path.GetDirectoryName(absFilePath);
            if (directoryPath == null) return FileNames;

            FileNames = Directory.GetFiles(directoryPath, fileBaseNamePattern, SearchOption.AllDirectories);
            return FileNames;
        }

        /// <summary>
        /// Create a file name which doesn't exists
        /// </summary>
        /// <param name="absFilePath">This should be an absolute path</param>
        /// <returns>absolute file path where the file doesn't exists</returns>
        public static string GetNonExistingFilePath(string absFilePath)
        {
            if (absFilePath == null) return absFilePath;
            var rewriteFileName = absFilePath;
            var fileSufixCounter = 0;
            var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(absFilePath);
            var fileExtension = Path.GetExtension(absFilePath);
            var directoryPath = Path.GetDirectoryName(absFilePath);

            try
            {
                while (File.Exists(rewriteFileName))
                {
                    rewriteFileName = $"{directoryPath}{Path.DirectorySeparatorChar}{fileNameWithoutExtension}{fileSufixCounter++}{fileExtension}";
                }
            }
            catch (Exception e)
            {
                return null;
            }

            return rewriteFileName;
        }

        public static Boolean IsFileExists(string absFilePath)
        {
            try
            {
                if (File.Exists(absFilePath)) return true;
            }
            catch (Exception e)
            {
                return false;
            }
            return false;
        }

        public static Boolean EnsureDirectoryPathExists(string absPath)
        {
            var directoryPath = Path.GetDirectoryName(absPath);
            if (directoryPath == null) return false;

            try
            {
                if (Directory.Exists(directoryPath)) return true;
                Directory.CreateDirectory(directoryPath);
            }
            catch (Exception e)
            {
                return false;
            }
            return true;
        }

    }
}