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
    public class CustomerAccProfileController : Controller
    {
        #region Index
        [HttpGet]
        [CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerAccProfile/GetAllCustomer";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerAccProfile/AddCustomer";
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
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerAccProfile/UpdateCustomer";
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
        public dynamic GetCusCategoryForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/KnowYourCustomer/GetCusCategoryForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetCusTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/KnowYourCustomer/GetCusTypeForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetAddress()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerAccProfile/GetAddress";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetGender()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerAccProfile/GetGender";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public dynamic AccTypeWiseCustomer(string data)
        {
            try
            {
                if (data == null)
                {
                    data = "\"0\"";
                }
                string jsonData = "{\"AccTypeId\":" + data + "}";
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerAccProfile/AccTypeWiseCustomer";
                dynamic json = DataManipulation.SetObject(url, jsonData);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Current User Info
        [HttpPost]
        [CustomActionFilter]
        public dynamic UserInfo(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerAccProfile/GetCustomerById";
                dynamic json = DataManipulation.SetObject(url, data);
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