using mTaka.APP.Common;
using mTaka.APP.Filter;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class LedgerController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        #region GetAllLedgerTxnByAccNoandDate
        [HttpPost]
        //[CustomActionFilter]
        public dynamic GetAllLedgerTxnByAccNoandDate(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Ledger/GetAllLedgerTxnByAccNoandDate";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region GetAccMasterInfoByAccNo
        [HttpPost]
        //[CustomActionFilter]
        public dynamic GetAccMasterInfoByAccNo(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Ledger/GetAccMasterInfoByAccNo";
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