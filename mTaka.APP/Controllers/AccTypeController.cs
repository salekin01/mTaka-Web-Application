using mTaka.APP.Common;
using mTaka.APP.Filter;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class AccTypeController : Controller
    {
        
        #region Index
        [HttpGet]
        [CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccType/GetAllAccType";
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
        [HttpPost]
        [CustomActionFilter]
        public dynamic Create(string data)
        {
            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccType/AddAccType";
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
        [HttpPost]
        [CustomActionFilter]
        public dynamic Edit(string data)
        {
            //try
            //{
            //    string a = data + "}";
            //    //string jsonData = @"{'AccTypeId':data,'AccTypeNm':'Individual','AccTypeShortNm':'In','AccCategoryId':'002','AccTypeParentAcc':'003'}"; 
            //    //string[] customJson = new string[] { "005", "Individual", "Ind" };
            //    string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccType/UpdateAccType";
            //    dynamic json = DataManipulation.SetObject(url, a);
            //    return json;
            //}
            //catch (Exception ex)
            //{
            //    return Json(ex.Message, JsonRequestBehavior.AllowGet);
            //}
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccType/UpdateAccType";
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
        public dynamic Delete(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccType/DeleteAccType";
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
        public dynamic GetAccTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/AccType/GetAccTypeForDD";
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