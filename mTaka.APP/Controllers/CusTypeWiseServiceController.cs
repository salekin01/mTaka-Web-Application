using mTaka.APP.Common;
using mTaka.APP.Filter;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace mTaka.APP.Controllers
{
    public class CusTypeWiseServiceController : Controller
    {
        #region Index

        [CustomActionFilter]
        [HttpGet]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusTypeWiseServiceList/GetAllCusTypeWiseServiceList";
                var json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Add
        [CustomActionFilter]
        [HttpPost]
        public dynamic Create(string data)
        {
            //dynamic jsonObj = JsonConvert.DeserializeObject(data);

            //foreach (var obj in jsonObj.objectList)
            //{
            //    Console.WriteLine(obj.address);
            //}

            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusTypeWiseServiceList/AddCusTypeWiseServiceList";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Edit
        [CustomActionFilter]
        [HttpPost]
        public dynamic Edit(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusTypeWiseServiceList/UpdateCusTypeWiseServiceList";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Delete
        [HttpPost]
        [CustomActionFilter]
        public ActionResult Delete(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusTypeWiseServiceList/DeleteCusTypeWiseServiceList";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region DropDown
        [HttpGet]
        public dynamic GetCusTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusType/GetCusTypeForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public dynamic CusTypeForAccCategory(string data)
        {
            try
            {
                if (data == null)
                {
                    data = "\"0\"";
                }
                string jsonData = "{\"AccCategoryId\":" + data + "}";
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusTypeWiseServiceList/AccTypeForCusCategory";
                dynamic json = DataManipulation.SetObject(url, jsonData);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }

            //try
            //{
            //    string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusType/CusTypeForCusCategory";
            //    dynamic json = DataManipulation.SetObject(url, data);
            //    return json;
            //}
            //catch (Exception ex)
            //{
            //    return Json(ex.Message, JsonRequestBehavior.AllowGet);
            //}
        }

        #endregion
    }
}