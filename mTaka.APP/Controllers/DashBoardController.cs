using mTaka.APP.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class DashBoardController : Controller
    {

        #region Common Dashboard
        [HttpPost]
        public dynamic GetCommonDashboardInfo()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Dashboard/GetCommonDashboardInfo";
                var json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion


        #region GetDashBoardInfo
        [HttpPost]
        public dynamic GetDashBoardInfo(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Dashboard/GetDashBoardInfo";
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