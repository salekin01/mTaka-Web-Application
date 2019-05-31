using mTaka.APP.Common;
using mTaka.APP.Filter;
using System;
using System.Configuration;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class CusCategoryController : Controller
    {
        [HttpPost]
        [CustomActionFilter]
        public dynamic AddCusCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusCategory/AddCusCategory";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                string err = ex.Message;
                return null;
            }
        }

        [HttpPost]
        [CustomActionFilter]
        public dynamic DeleteCusCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusCategory/DeleteCusCategory";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                string err = ex.Message;
                return null;
            }
        }

        [HttpPost]
        [CustomActionFilter]
        public dynamic EditCusCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusCategory/UpdateCusCategory";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                string err = ex.Message;
                return null;
            }
        }

        [HttpGet]
        public dynamic GetCusCategory(string data)
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/CusCategory/GetAllCusCategory";
                dynamic json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                string err = ex.Message;
                return null;
            }
        }
    }
}