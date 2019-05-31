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
    public class ChannelAccProfileController : Controller
    {
        [HttpGet]
        [CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChannelAccProfile/GetAllChannelAccProfile";
                var json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [CustomActionFilter]
        public dynamic Create(string data)
        {
            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChannelAccProfile/AddChannelAccProfile";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [CustomActionFilter]
        public dynamic Edit(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChannelAccProfile/UpdateChannelAccProfile";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        [CustomActionFilter]
        public dynamic Delete(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChannelAccProfile/DeleteChannelAccProfile";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        #region DropDown
        [HttpGet]
        //[CustomActionFilter]
        public dynamic GetChannelAccProfileForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChannelAccProfile/GetChannelAccProfileForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region GetChannelAccProfileInfobyWalletAccNo
        [HttpGet]
        [CustomActionFilter]
        public dynamic GetChannelAccProfileInfobyWalletAccNo(string data)
        {
            try
            {
                if (data != null)
                {
                    string jsonData = "{\"ParentAccountprofileId\":" + data + "}";
                    string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChannelAccProfile/GetChannelInfobyWalletAccNo";
                    dynamic json = DataManipulation.SetObject(url, jsonData);
                    //string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChannelAccProfile/GetChannelAccProfileInfobyWalletAccNo";
                    //dynamic json = DataManipulation.SetObject(url, data);
                    return json;
                }
                else
                {
                    return null;
                }
                
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
    }
}
