using mTaka.APP.Common;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class FileUploadController : Controller
    {
        [HttpPost]
        public virtual string UploadFiles(object obj)
        {
            var length = Request.ContentLength;
            var bytes = new byte[length];
            var data = Request.InputStream.Read(bytes, 0, length);

            var fileName = Request.Headers["X-File-Name"];
            var fileSize = Request.Headers["X-File-Size"];
            //var fileType = Request.Headers["X-File-Type"];

           // C:\\inetpub\\wwwroot\\mTaka\\Development\\mTakaWebAPP\\mTaka.APP\\assets\\pictures" + fileName;
            var saveToFileLoc = "C:\\inetpub\\wwwroot\\mTaka\\Development\\mTakaWebAPP\\mTaka.APP\\assets\\pictures\\" + fileName;

            // save the file.
            var fileStream = new FileStream(saveToFileLoc, FileMode.Create, FileAccess.ReadWrite);

            string path = saveToFileLoc;
            string[] pathArr = path.Split('\\');
            string[] fileArr = pathArr.Last().Split('.');

            string fileType = fileArr.Last().ToString();
            var fileNamedb = Path.GetFileNameWithoutExtension(saveToFileLoc);
            //var filelocation = Path.GetTempPath(saveToFileLoc);

            //byte[] bbytes = System.IO.File.ReadAllBytes(fileName);

            fileStream.Write(bytes, 0, length);
            fileStream.Close();

                string jsonData = "{\"fileName\":\"" + fileNamedb + "\",\"fileSize\":\"" + fileSize + "\",\"fileType\":\"" + fileType + "\",\"filelocation\":\"" + data + "\"}";

                //var json1 = JObject.Parse(jsonData);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/FileUpload/UploadFile";
                dynamic json = DataManipulation.SetObject(url, jsonData);
            
 
            return string.Format("{0} bytes uploaded", bytes.Length);
        }
    }
}