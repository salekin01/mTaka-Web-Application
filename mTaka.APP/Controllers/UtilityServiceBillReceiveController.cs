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
    public class UtilityServiceBillReceiveController : Controller
    {
        #region DropDown
        [HttpGet]
        public dynamic GetProviderForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/USBParam/GetAllProviderForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        [HttpPost]
        public dynamic GetProviderInfo(string data)
        {
            try
            {
            //    if (data == null)
            //    {
            //        data = "\"0\"";
            //    }
                //string jsonData = "{\"CusCategoryId\":" + data + "}";
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/GetUsbParam";
                dynamic json = DataManipulation.SetObject(url, data);
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
        [HttpPost]
        public dynamic GetHeaderValue(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/GetUsbInqHeaderById";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }


        #region SaveUSB
        [HttpPost]
        public dynamic SaveUSB(string data)
        {
            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/SaveUsb";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }

        }
        #endregion

        #region TotalUSBAmount
        [HttpPost]
        public dynamic TotalUSBAmount(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/TotalUSBAmount";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Daily Collection
        #region DESCO
        [HttpGet]
        public dynamic DescoDailyCollection(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/DailyDescoCollection";
                var json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
        #endregion

        #region DailyBillList
        [HttpPost]
        public dynamic DailyBillList(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/DailyBillList";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region GetOperatorInfo
        [HttpPost]
        public dynamic GetOperatorInfo(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UsbReceive/GetOperatorInfo";
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