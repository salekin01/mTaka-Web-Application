using mTaka.APP.Common;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class UserActivityLogController : Controller
    {
        #region Add

        [HttpPost]

        public dynamic Create(string data)
        {
            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UserActivityLog/AddUserActivityLog";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Search Result
        [HttpPost]
        public dynamic UserActivityLogByAccNo(string data)
        {
            try
            { 
                string jsonData = "{\"WalletAccountNo\":" + data + "}";
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UserActivityLog/UserActivityLogByAccNo";
                var json = DataManipulation.SetObject(url, jsonData);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public dynamic UserActivityLogByDate(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UserActivityLog/UserActivityLogByDate";
                var json = DataManipulation.SetObject(url, data);
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