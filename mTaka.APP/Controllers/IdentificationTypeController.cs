using mTaka.APP.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class IdentificationTypeController : Controller
    {
        [HttpGet]
        public dynamic GetIdentificationTypeForDD(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/IdentificationType/GetIdentificationTypeForDD";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                string err = ex.Message;
                return null;
            }
        }
    }
}