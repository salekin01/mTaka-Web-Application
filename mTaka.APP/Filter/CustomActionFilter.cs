using mTaka.APP.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace mTaka.APP.Filter
{
    public class CustomActionFilter : ActionFilterAttribute, IActionFilter
    {
        void IActionFilter.OnActionExecuting(ActionExecutingContext filterContext)
        {
            string NewController = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            string BranchId = "005";//get from session
            string UserId = "003";//get from session
            string OldController = string.Empty;
            string OldPageName = string.Empty;

            if(filterContext.HttpContext.Session["MTKSession"] != null)
            {
                OldController = (filterContext.HttpContext.Session["MTKSession"] as mTakaSession).OldController;
                OldPageName = (filterContext.HttpContext.Session["MTKSession"] as mTakaSession).OldPageName;
            }
            
            //random generate Acc No
            string WalletAccountNo = string.Empty;
            if (filterContext.HttpContext.Session["MTKSession"] != null && (filterContext.HttpContext.Session["MTKSession"] as mTakaSession).CurrentUserId != null)
            {
                WalletAccountNo = (filterContext.HttpContext.Session["MTKSession"] as mTakaSession).CurrentUserId;
            }
            
            else
            {
                //int _min = 100000000;
                //int _max = 999999999;
                //Random _rdm = new Random();
                //int AccountNo = _rdm.Next(_min, _max);
                //WalletAccountNo = AccountNo.ToString();

                //filterContext.Result = new RedirectResult("~/authSignIn/authSignIn");
                //return ;
                //base.OnActionExecuting(filterContext);

                //var data = filterContext.HttpContext.Request.RequestContext.RouteData;
                //var currentAction = data.GetRequiredString("action");
                //var currentController = data.GetRequiredString("controller");

                //filterContext.Result = new RedirectToRouteResult(
                //    new RouteValueDictionary
                //    {
                //        { "controller", currentController },
                //        { "action", currentAction + "_NotAuthenticated" }
                //            });

            }


            string param = filterContext.ActionParameters.ToString();
            
            string ActionName="";
            string currentPageName = string.Concat(filterContext.ActionDescriptor.ActionName);
            //ActionName = "Form: " + filterContext.HttpContext.Session["OldController"] +"/"+filterContext.HttpContext.Session["OldPageName"]+ " To: " + NewController + " /" + currentPageName;
            ActionName = "Form: " + OldController + "/" + OldPageName + " To: " + NewController + " /" + currentPageName;
            string IpAddress = "192.168.0.1";
            //string IpAddress = filterContext.HttpContext.Request.UserHostAddress;

            string jsonData = "{\"Action\":\"" + ActionName + "\",\"IpAddress\":\"" + IpAddress + "\",\"BranchId\":\"" + BranchId + "\",\"UserId\":\"" + UserId + "\",\"WalletAccountNo\":\"" + WalletAccountNo + "\",\"Parameters\":\"" + param + "\"}";
            //string data = "{'BranchId',Action,IpAddress,DateTime}";
            string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/UserActivityLog/AddUserActivityLog";
            //dynamic json = DataManipulation.SetObject(url, IpAddress);
            dynamic json = DataManipulation.SetObject(url, jsonData);

            //filterContext.HttpContext.Session["OldController"] = NewController;
            //filterContext.HttpContext.Session["OldPageName"] = currentPageName;
            mTakaSession.mTakaSessionContainer.OldController = NewController;
            mTakaSession.mTakaSessionContainer.OldPageName = currentPageName;
            //(filterContext.HttpContext.Session["MTKSession"] as mTakaSession).OldController = NewController;
            //(filterContext.HttpContext.Session["MTKSession"] as mTakaSession).OldPageName = currentPageName;

        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string WalletAccountNo = string.Empty;
            if (filterContext.HttpContext.Session["MTKSession"] != null && (filterContext.HttpContext.Session["MTKSession"] as mTakaSession).CurrentUserId != null)
            {
                WalletAccountNo = (filterContext.HttpContext.Session["MTKSession"] as mTakaSession).CurrentUserId;
            }
            else
            {
                filterContext.Result = new RedirectToRouteResult(
                new RouteValueDictionary {{ "Controller", "SignIn" },
                                      { "Action", "Logout" } });
            }
        }
    }
}