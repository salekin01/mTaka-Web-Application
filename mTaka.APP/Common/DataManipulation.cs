using mTaka.Utility;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;

namespace mTaka.APP.Common
{
    public class DataManipulation
    {
        public static dynamic SetObject(string url, string data)
        {
            string _userId = string.Empty;
            //if(!string.IsNullOrWhiteSpace(data))
            //{
            //    JToken token = JToken.Parse(data);
            //    dynamic UserId = token.SelectToken("UserId");
            //    _userId = UserId.Value;
            //}
            //else
            //{
            //    return null;
            //}

            var session = System.Web.HttpContext.Current.Session["MTKSession"] as mTakaSession;
            if (session != null && session.CurrentUserId != null)
            {
                _userId = session.CurrentUserId;
            }
            else
                return null;


            APIServiceRequest APISR = new APIServiceRequest();
            APISR.BranchId = "0001";
            APISR.FunctionId = "0101010001";
            APISR.InstituteId = "111";
            APISR.RequestClientIP = IPAddress.GetLocalIPv4();
            APISR.RequestAppId = "09";
            APISR.SessionId = System.Web.HttpContext.Current.Session.SessionID;
            APISR.UserId = _userId;
            APISR.RequestDateTime = DateTime.Now.ToString(CultureInfo.CurrentCulture);
            APISR.BusinessData = data; 
            //APISR.BusinessData = Newtonsoft.Json.JsonConvert.SerializeObject(data); 

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.Timeout = TimeSpan.FromSeconds(30.0);

           // client.DefaultRequestHeaders.Add("Authorization", "Bearer " + System.Web.HttpContext.Current.Session["AuthenticationToken"]);
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + session.AuthenticationToken);
            HttpContent content = new StringContent(APISR.ToString(), Encoding.UTF8, "application/json");

            var response = client.PostAsJsonAsync(url, APISR).Result;
            var _requestedData = response.Content.ReadAsStringAsync().Result;
            var _requestedDataObject = JsonConvert.DeserializeObject<APIServiceResponse>(_requestedData);
            dynamic json = (_requestedDataObject.ResponseBusinessData != null)? JsonConvert.DeserializeObject(_requestedDataObject.ResponseBusinessData) : null;

            ////var token = JToken.Parse(json);

            //if (json is JArray)
            //{
            //}
            //else if (json is JObject)
            //{
            //    json["ResponseMessage"] = "sfdg";
            //}
            
            return json;
        }

        #region USB
        //public static dynamic SetObjectUsb(string url, string data)
        //{
        //    string _userId = string.Empty;

        //    if (System.Web.HttpContext.Current.Session["currentUserID"] != null)
        //    {
        //        _userId = System.Web.HttpContext.Current.Session["currentUserID"].ToString();
        //    }
        //    else
        //        return null;


        //    USBServiceRequest USBAPI = new USBServiceRequest();

            
        //    USBAPI.header.utilityServiceBillActionType = "2";


        //    USBAPI.header.utilityServiceBillActionType = "2";
        //    USBAPI.header.utilityServiceBillType = "DESCO";
        //    USBAPI.header.utilityServiceBillPaymentMode = "TRANSFAR";
        //    USBAPI.header.serviceUserID = "IBU";
        //    USBAPI.header.servicePassword = "IBU";
        //    USBAPI.header.transactionSourceName = "ABC BANK";
        //    USBAPI.header.transactionSourceId = "0031";
        //    USBAPI.header.requestDateTime = DateTime.Now.ToString(CultureInfo.CurrentCulture);
        //    USBAPI.header.requestId = "1425978";
        //    USBAPI.header.submitBy = "Shormi0031";
        //    USBAPI.header.comments = "DESCO Bill Payment";

        //    HttpClient client = new HttpClient();
        //    client.DefaultRequestHeaders.Clear();
        //    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //    client.Timeout = TimeSpan.FromSeconds(30.0);

        //    client.DefaultRequestHeaders.Add("Authorization", "Bearer " + System.Web.HttpContext.Current.Session["AuthenticationToken"]);
        //    HttpContent content = new StringContent(USBAPI.ToString(), Encoding.UTF8, "application/json");

        //    var response = client.PostAsJsonAsync(url, USBAPI).Result;
        //    var _requestedData = response.Content.ReadAsStringAsync().Result;
        //    var _requestedDataObject = JsonConvert.DeserializeObject<USBServiceRequest>(_requestedData);
        //    //var test11 = JsonConvert.DeserializeObject<USBServiceRequestHeader>(_requestedDataObject);
        //    //dynamic json = (_requestedDataObject.header != null) ? JsonConvert.DeserializeObject(_requestedDataObject.) : null;

        //    return null;
        //}
        #endregion
    }
}