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
using System.Net.Sockets;
using System.Web;
using System.Web.Mvc;

namespace mTaka.APP.Controllers
{
    public class SignInController : Controller
    {
        [HttpPost]
        public dynamic Create(string data)
        {
            try
            {
                string result = "0";
                dynamic DynamicBizObject = new System.Dynamic.ExpandoObject();
                //var json1 = JObject.Parse(data);

                JToken token = JToken.Parse(data);
                dynamic UserId = token.SelectToken("UserId");
                dynamic Password = token.SelectToken("Password");
                //System.Web.HttpContext.Current.Session["currentUserID"] = UserId.Value;
                mTakaSession.mTakaSessionContainer.CurrentUserId = UserId.Value;

                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/SignIn/Login";
                dynamic json = DataManipulation.SetObject(url, data);
                if(json != null)
                {
                    string[] vResult = json.Split(',');
                    result = vResult[0];
                }

                if (result == "1")
                {
                    DynamicBizObject.Result = result;
                    string _token = GetToken(ConfigurationManager.AppSettings["mTaka_server"], UserId.Value, Password.Value);
                    var _desToken = JsonConvert.DeserializeObject<AuthenticationToken>(_token);
                    //System.Web.HttpContext.Current.Session["AuthenticationToken"] = _desToken.access_token;
                    //HttpContext.Items.Add("AuthenticationToken", _desToken.access_token);
                    mTakaSession.mTakaSessionContainer.AuthenticationToken = _desToken.access_token;
                    DynamicBizObject.ResponseMessage = "Successfully loggedin!";
                    DynamicBizObject.MTKSession = mTakaSession.mTakaSessionContainer;
                    //DynamicBizObject.MTKSession.AuthenticationToken = null;
                }
                else if (result == "2")   // for "restrict multiple login"
                {
                    DynamicBizObject.Result = result;
                    DynamicBizObject.ResponseMessage = "User already logged in!";
                }
                else if (result == "3")  // for inactive user
                {
                    DynamicBizObject.Result = result;
                    DynamicBizObject.ResponseMessage = "User id is inactive! Pls Contact with system administrator!";
                }
                else if (result == "4")  // for first time login
                {
                    DynamicBizObject.Result = result;
                    DynamicBizObject.ResponseMessage = "Password have changed successfully!";
                }
                else if (result == "6")  // for if user have no role
                {
                    DynamicBizObject.Result = result;
                    DynamicBizObject.ResponseMessage = "You have no role for this application!";
                }
                else if (result == "7")  // for if user have no role
                {
                    DynamicBizObject.Result = result;
                    DynamicBizObject.ResponseMessage = "Domain user is not binded!";
                }
                else if (result == "8")  // for if user have no role
                {
                    DynamicBizObject.Result = result;
                    DynamicBizObject.ResponseMessage = "User Locked!";
                }

                else if (result == "0")
                {
                    loginAttempts();
                    var session = System.Web.HttpContext.Current.Session["MTKSession"] as mTakaSession;
                    string a = session.LoginAttempts;
                    //string a = Session["loginAttempts"].ToString();
                    string b = ConfigurationManager.AppSettings["MaxFailedAccessAttemptsBeforeLockout"];

                    DynamicBizObject.Result = result;
                    DynamicBizObject.ResponseMessage = "The User ID and password you entered don't match!";


                    if (Convert.ToInt16(a) > Convert.ToInt16(b))
                    {
                        //url = ConfigurationManager.AppSettings["lgarda_server"] + "/Lock_User_ID/" + pLG_USER_SETUP_PROFILE_MAP.USER_ID + "?format=json";
                        //result = HttpWcfRequest.PostParameter(url);

                        if (result == "5")
                        {
                            DynamicBizObject.Result = result;
                            DynamicBizObject.ResponseMessage = "User id Locked!";
                        }
                    }
                }

                dynamic json1 = JsonConvert.SerializeObject(DynamicBizObject);
                return json1;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public int loginAttempts()
        {
            var session = System.Web.HttpContext.Current.Session["MTKSession"] as mTakaSession;
            if (!(session.LoginAttempts == null))
            {
                mTakaSession.mTakaSessionContainer.LoginAttempts = (int.Parse(session.LoginAttempts) + 1).ToString();
                return int.Parse(session.LoginAttempts);
            }
            else
            {
                session.LoginAttempts = "1";
                return 1;
            }
        }
        public string GetLocalIPv4()
        {
            string localIP = string.Empty;
            using (Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0))
            {
                socket.Connect("8.8.8.8", 65530);
                IPEndPoint endPoint = socket.LocalEndPoint as IPEndPoint;
                localIP = endPoint.Address.ToString();
            }
            return localIP;
        }
        [HttpGet]
        //[CustomActionFilter]
        public dynamic GetMenuWithPermittedFunctions()
        {
            try
            {
                dynamic json = null;
                //if (Session["currentUserID"] != null)
                var session = System.Web.HttpContext.Current.Session["MTKSession"] as mTakaSession;
                if (session.CurrentUserId != null )
                {
                    //if(Session["MenuList"] == null)
                    if (session.MenuList == null)
                    {
                        var data = JsonConvert.SerializeObject(new { UserId = session.CurrentUserId });
                        string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/SignIn/GetMenuWithPermittedFunctions";
                        json = DataManipulation.SetObject(url, data);
                        //Session["MenuList"] = json;
                        session.MenuList = json;
                    }
                    //else if(Session["MenuList"] != null)
                    else if(session.MenuList != null)
                    {
                        //json = Session["MenuList"];
                        json = session.MenuList;
                    }
                    return json;
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        
        [HttpGet]
        //[CustomActionFilter]
        public dynamic GetMenuList()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Menu/GetAllMenuService";
                dynamic json = DataManipulation.SetObject(url, string.Empty);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        static string GetToken(string url, string userName, string password)
        {
            var pairs = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>( "grant_type", "password" ),
                        new KeyValuePair<string, string>( "username", userName ),
                        new KeyValuePair<string, string> ( "Password", password )
                    };
            var content = new FormUrlEncodedContent(pairs);
            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
            using (var client = new HttpClient())
            {
                var response = client.PostAsync(url + "/Token", content).Result;
                return response.Content.ReadAsStringAsync().Result;
            }
        }

        [HttpPost]
        public dynamic Logout()
        {
            string data = string.Empty;
            var session = System.Web.HttpContext.Current.Session["MTKSession"] as mTakaSession;
            if (session != null && session.CurrentUserId != null)
            {
                //dynamic DynamicBizObject = new System.Dynamic.ExpandoObject();
                //DynamicBizObject.UserId = Session["currentUserID"];
                //var data = new JavaScriptSerializer().Serialize(DynamicBizObject);

                data = Newtonsoft.Json.JsonConvert.SerializeObject(new { UserId = session.CurrentUserId });
            }
            else
            {
                Session.Clear();
                Session.Abandon();
                return "1";
            }

            string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/SignIn/Logout";
            dynamic json = DataManipulation.SetObject(url, data);

            if (json == "1")
            {
                //Session["currentUserID"] = null; //it's my session variable
                Session.Clear();
                Session.Abandon();
                //FormsAuthentication.SignOut(); //you write this when you use FormsAuthentication
            }
            return json;
        }

        [HttpGet]
        public dynamic GetSession()
        {
            try
            {
                var session = System.Web.HttpContext.Current.Session["MTKSession"] as mTakaSession;
                if (session != null)
                    return session;
                else
                    return null;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
    }
}