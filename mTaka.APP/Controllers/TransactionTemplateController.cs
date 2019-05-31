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

namespace mTaka.APP.Controllers
{
    public class TransactionTemplateController : Controller
    {
        #region Index
        [CustomActionFilter]
        [HttpGet]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/TransactionTemplate/GetAllTransactionTemplate";
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
            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/TransactionTemplate/AddTransactionTemplate";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/TransactionTemplate/UpdateTransactionTemplate";
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
        [CustomActionFilter]
        [HttpPost]
        public dynamic Delete(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/TransactionTemplate/DeleteTransactionTemplate";
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