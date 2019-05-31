using mTaka.APP.Common;
using mTaka.APP.Filter;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class ManagerTypeController : Controller
    {
        #region Index
        [HttpPost]
        [CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerType/GetAllManagerType";
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

        #region Add

        [HttpPost]
        [CustomActionFilter]
        public dynamic Create(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerType/AddManagerType";
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

        #region Edit
        [HttpPost]
        [CustomActionFilter]
        public dynamic Edit(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerType/UpdateManagerType";
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

        #region Delete
        [HttpPost]
        [CustomActionFilter]
        public dynamic Delete(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerType/DeleteManagerType";
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

        #region DropDown        
        [HttpGet]
        public dynamic GetManagerTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerType/GetManagerTypeForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
    }
}