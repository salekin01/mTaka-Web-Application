using mTaka.APP.Common;
using mTaka.APP.Filter;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MFS_WEB.Controllers
{
    public class ManagerCategoryController : Controller
    {
        [HttpGet]
        [CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerCategory/GetAllManagerCategory";
                var json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [CustomActionFilter]
        [HttpPost]
        public dynamic Create(string data)
        {
            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerCategory/AddManagerCategory";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [CustomActionFilter]
        [HttpPost]
        public dynamic Edit(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerCategory/UpdateManagerCategory";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [CustomActionFilter]
        [HttpPost]
        public dynamic Delete(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerCategory/DeleteManagerCategory";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult Details(int id)
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
        public ActionResult Edit(int id)
        {
            return View();
        }
        public ActionResult Delete(int id)
        {
            return View();
        }

        #region DropDown
        [HttpGet]
        public dynamic GetManagerCategoryForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ManagerCategory/GetManagerCategoryForDD";
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