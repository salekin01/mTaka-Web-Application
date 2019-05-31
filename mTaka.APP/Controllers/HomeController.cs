using mTaka.APP.Common;
using mTaka.APP.Filter;
using mTaka.APP.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        //[CustomActionFilter]
        public ActionResult Index()
        {
            //return RedirectToAction("Login", "Home");
            //return View("Index", "_LayoutMaster");
            //System.Web.HttpContext.Current.Session["currentUserID"] = null;
            return View();
        }
        //[CustomActionFilter]
        public ActionResult Login() 
        {
            
            return View();
        }
        //[CustomActionFilter]
        [HttpPost]
        public ActionResult Login(string inputUsername, string inputPassword)
        {
          
            try
            {
                using (var client = new WebClient())
                {
                    UserCredentials OBJ_UserCredentials = new UserCredentials(); //Setting parameter to post  
                    OBJ_UserCredentials.USER_ID = inputUsername;
                    OBJ_UserCredentials.PASSWORD = inputPassword;
                    OBJ_UserCredentials.APPLICATION_ID = "09";
                    OBJ_UserCredentials.USER_SESSION_ID = System.Web.HttpContext.Current.Session.SessionID;         
                    client.Headers.Add("Content-Type:application/json");
                    client.Headers.Add("Accept:application/json");
                    var uri = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Login/Login";
                    var result = client.UploadString(uri, JsonConvert.SerializeObject(OBJ_UserCredentials));

                    if (result == "1")
                    {
                        

                    }

                    if (result == "2")   // for "restrict multiple login"
                    {

                       

                    }
                    if (result == "3")  // for inactive user
                    {
                       

                    }
                    if (result == "4")  // for first time login
                    {
                      
                    }
                    if (result == "6")  // for if user have no role
                    {
                        

                    }
                    if (result == "7")  // for if user have no role
                    {
                       

                    }
                    if (result == "8")  // for if user have no role
                    {
                       

                    }

                    if (result == "0")
                    {
                                               
                    }
                   
                }   
                                
            }
            catch (Exception ex)
            {
                return View();
            }

            //return View("Index", "_LayoutMaster");
            //return RedirectToAction("Index", "Home");
            //return View("Index", "_LayoutMaster");
            return RedirectToAction("Index", "Home");
        }

        [CustomActionFilter]
        public ActionResult Dashboard()
        {
            return View();
        }

        [HttpGet]
        public dynamic GetMenuList()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/MenuManage/GetAllMenuService";               
                
                using (WebClient wc = new WebClient())
                {
                    //String data = "{" + wc.DownloadString(url) + "}";
                    String data =wc.DownloadString(url) ;
                    dynamic json = JsonConvert.DeserializeObject(data);
                  return json;
                }
                
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

    }
}