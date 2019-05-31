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
    public class AccCategoryController : Controller
    {
        #region Index
        [CustomActionFilter]
        [HttpPost]
        public dynamic GetAccCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccCategory/GetAllAccCategory";
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
        public dynamic AddAccCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccCategory/AddAccCategory";
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
        public dynamic EditAccCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccCategory/UpdateAccCategory";
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
        public dynamic DeleteAccCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccCategory/DeleteAccCategory";
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
        //[CustomActionFilter]
        public dynamic GetAccCategoryForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccCategory/GetAccCategoryForDD";
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