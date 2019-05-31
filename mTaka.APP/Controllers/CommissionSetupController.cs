using mTaka.APP.Common;
using mTaka.APP.Filter;
using Newtonsoft.Json.Linq;
using System;
using System.Configuration;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class CommissionSetupController : Controller
    {
        #region Index
        [HttpGet]
        //[CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommissionSetup/GetAllCommissionSetup";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommissionSetup/AddCommissionSetup";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CommissionSetup/GetManagerById?type=json";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region GetDefineServiceForDD
        [HttpGet]
        public dynamic GetDefineServiceForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/DefineService/GetDefineServiceForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region GetAccTypeForDD
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