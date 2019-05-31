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
    public class ChargeRuleController : Controller
    {
        [HttpGet]
        [CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRule/GetAllChargeRules";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRule/AddChargeRule";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRule/UpdateChargeRule";
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
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRule/DeleteChargeRule";
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
        public dynamic GetChargeRuleForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRule/GetChargeRuleForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetChargesCategoryForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargesCategory/GetChargesCategoryForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetChargeRuleTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRuleType/GetChargeRuleTypeForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetChargeRateMethodForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRateMethod/GetChargeRateMethodForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetChargeRateTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeRateType/GetChargeRateTypeForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetDecimalRoundingForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/DecimalRounding/GetDecimalRoundingForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetCustomerFilterForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CustomerFilter/GetCustomerFilterForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public dynamic GetCalenderPeriodForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CalenderPeriod/GetCalenderPeriodForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

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

        [HttpGet]
        public dynamic GetChargeActTypeForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/ChargeActType/GetChargeActTypeForDD";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public dynamic GetGLAccForDD(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/GLChart/GetGLAccForDD";
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