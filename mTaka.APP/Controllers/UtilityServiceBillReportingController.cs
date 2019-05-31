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
    public class UtilityServiceBillReportingController : Controller
    {
        #region Index
        [CustomActionFilter]
        [HttpGet]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/USBReportingField/GetAllUSBReportingField";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/USBReportingField/AddUSBReportingField";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/USBReportingField/UpdateUSBReportingField";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Get Reporting Info for Dynamic HTML
        public dynamic GetProviderRPTInfo(string data)
        {
            try
            {
                if (data == null)
                {
                    data = "\"0\"";
                    return null;
                }
                string jsonData = "{\"PvId\":" + data + "}";

                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/USBReportingField/GetProviderRPTInfo";
                dynamic json = DataManipulation.SetObject(url, jsonData);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion


        #region Get Reporting Info According to specific Provider
        [HttpPost]
        public dynamic GetProviderInfo(string data)
        {
            try
            {
                if (data == null)
                {
                    return null;
                }else if (data =="{}"){
                    return null;
                }
                //string jsonData = "{\"DefineServiceId\":" + data + "}";

                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/USBReportingField/GetUSBReportingField";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion


        [HttpPost]
        public dynamic GetProviderRPTInfoFormBU(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/GetBillInfo";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }

        }
    }
}