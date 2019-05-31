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
    public class CommonServiceController : Controller
    {
        #region Add
        [CustomActionFilter]
        [HttpPost]
        public dynamic Create(string data)
        {
            try
            {
                var json1 = JObject.Parse(data);
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/AddCommonService";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        [HttpGet]
        public dynamic GetAllAddress()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetAllAddress";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetAllGender()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetAllGender";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetAllNationality()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetAllNationality";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        #region Source of Account Dropdown
        [HttpGet]
        [CustomActionFilter]
        public dynamic GetSourceofAccForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetSourceofAccForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Type of Account Dropdown
        [HttpGet]
        [CustomActionFilter]
        public dynamic GetTypeofAccForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetTypeofAccForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Account Balance Type Dropdown
        [HttpGet]
        [CustomActionFilter]
        public dynamic GetAccBalanceTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetAccBalanceTypeForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Trans Type
        [HttpPost]
        public dynamic GetAllTransType()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetAllTransType";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Transaction Setup Dropdown
        [HttpGet]
        public dynamic GetTransactionSetupForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetTransactionSetupForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region GetMobileOperator
        [HttpGet]
        public dynamic GetMobileOperator()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetMobileOperator";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Token Format
        [HttpGet]
        public dynamic GetTokenFormatForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommonService/GetTokenFormatForDD";
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