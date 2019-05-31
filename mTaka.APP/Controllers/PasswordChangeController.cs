using mTaka.APP.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class PasswordChangeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        #region Add

        [HttpPost]
        //[CustomActionFilter]
        public dynamic PasswordChange(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/PasswordChange/PasswordChange";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                string err = ex.Message;
                return null;
            }

        }
        #endregion
    }
}