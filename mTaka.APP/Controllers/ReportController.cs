//using LeadSoft.Report;
using mTaka.APP.Common;
using mTaka.APP.Models;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Net;
using System.Web.Mvc;
using CrystalDecisions.Shared;
using CrystalDecisions.CrystalReports.Engine;
using LeadSoft.ReportHelper;
using mTaka.APP.Filter;

namespace mTaka.APP.Controllers
{
    public class ReportController : Controller
    {
          
        [HttpPost]
        [CustomActionFilter]
        public dynamic Index(string data)
        {
            try
            {
                //Session["FunctionId"] = data;
                mTakaSession.mTakaSessionContainer.FunctionId = data;
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Report/GetReportConfigParams";
                var json = DataManipulation.SetObject(url, data);
                return json;
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        //[CustomActionFilter]
        public ActionResult ViewReportPDF(string data)
        {
            TempData["ex1"] = "";
            TempData["ex2"] = "";
            TempData["ex3"] = "";

            ReportConfig _ReportConfigMaster = new ReportConfig();
            ReportBase objReportBase = new ReportBase();
            WebClient client = new WebClient();

            try
            {
                string RptServerPath = string.Empty;
                //var paramValues = JsonConvert.DeserializeObject<Dictionary<string, string>>(data);
                //var FunctionId = Session["FunctionId"];
                var FunctionId = (System.Web.HttpContext.Current.Session["MTKSession"] as mTakaSession).FunctionId;

                //if (!paramValues.TryGetValue("FunctionId", out FunctionId))
                //{
                //    return null; 
                //}

                ReportDocument _ReportClientDocument = new ReportDocument();
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Report/GetReportByFunctionId";
                var json = DataManipulation.SetObject(url, FunctionId.ToString());
                _ReportConfigMaster =JsonConvert.DeserializeObject<ReportConfig>(json.ToString());
                if (_ReportConfigMaster != null)
                {
                    RptServerPath = System.Web.Configuration.WebConfigurationManager.AppSettings["reportPath"];

                    objReportBase.BankName = "Southeast Bank Limited";
                    objReportBase.BranchId = "0001";
                    objReportBase.BranchName = "Head Office";
                    objReportBase.ReportName = _ReportConfigMaster.ReportFile;
                    objReportBase.ReportServerpath = RptServerPath;
                    objReportBase.DBName = _ReportConfigMaster.DatabaseConnection.ConnDbNm;
                    objReportBase.DBPassword = _ReportConfigMaster.DatabaseConnection.ConnPassWord;
                    objReportBase.DBServerName = _ReportConfigMaster.DatabaseConnection.ConnSchemaNm;
                    objReportBase.DBUserId = _ReportConfigMaster.DatabaseConnection.ConnUserId;

                    ArrayList _ParameterArrayList = new ArrayList();

                    foreach (Models.ReportConfigParam p in _ReportConfigMaster.ReportConfigParams)
                    {
                        foreach (string key in Request.QueryString.AllKeys)
                        {

                            if (key.ToUpper() == p.Parameter.ToUpper())
                            {
                                string pkey = System.Uri.UnescapeDataString(key);
                                string pvalue = System.Uri.UnescapeDataString(Request.QueryString[key]);
                                _ParameterArrayList.Add(pkey);
                                if (!string.IsNullOrEmpty(pvalue))
                                {
                                    if (p.ParameterDatatype.ToUpper() == "C" || p.ParameterDatatype.ToUpper() == "N")
                                        _ParameterArrayList.Add(pvalue.Trim());
                                    else if (p.ParameterDatatype.ToUpper() == "D")
                                        _ParameterArrayList.Add(Convert.ToDateTime(pvalue));
                                    else
                                        _ParameterArrayList.Add(pvalue);
                                }
                                else
                                {
                                    _ParameterArrayList.Add("");
                                }
                            }
                        }
                    }

                    objReportBase.ReportParameterList = _ParameterArrayList;
                }
                GetReportDocument(_ReportClientDocument, objReportBase);
                
            }

            catch (TypeInitializationException te)
            {
                TempData["ex1"] = "1. " + te.Message;
            }
            catch (Exception e)
            {
                TempData["ex2"] = "2. " + e.Message;
            }
            //TempData["ex2"] = _ReportConfigMaster.ReportFile;
            return View();
        }

        private void ShowPDF(ReportDocument _ReportClientDocument)
        {
            System.IO.Stream oStream = null;
            byte[] byteArray = null;
            oStream = _ReportClientDocument.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            byteArray = new byte[oStream.Length];
            oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));
            Response.ClearContent();
            Response.ClearHeaders();
            Response.ContentType = "application/pdf";
            Response.BinaryWrite(byteArray);
            Response.Flush();
            Response.Close();
            _ReportClientDocument.Close();
            _ReportClientDocument.Dispose();
        }

       
        private void GetReportDocument(ReportDocument pReportClientDocument, ReportBase objReportBase)
        {
            LSReportCrystal _LSReportCrystal = new LSReportCrystal();
            _LSReportCrystal.reportBase = objReportBase;
            pReportClientDocument = _LSReportCrystal.GenerateReport();

            foreach (Section oSection in pReportClientDocument.ReportDefinition.Sections)
            {
                foreach (ReportObject obj in oSection.ReportObjects)
                {
                    FieldObject field;
                    field = pReportClientDocument.ReportDefinition.ReportObjects[obj.Name] as FieldObject;

                    if (field != null)
                    {
                        Font oFon1 = new Font("Arial Narrow", field.Font.Size - 1F);
                        Font oFon2 = new Font("Arial", field.Font.Size - 1F);

                        if (oFon1 != null)
                        {
                            field.ApplyFont(oFon1);
                        }
                        else if (oFon2 != null)
                        {
                            field.ApplyFont(oFon2);
                        }
                    }
                }
            }

            Stream oStream = null;
            byte[] byteArray = null;
            oStream = pReportClientDocument.ExportToStream(ExportFormatType.PortableDocFormat);
            byteArray = new byte[oStream.Length];
            oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));
            Response.ClearContent();
            Response.ClearHeaders();
            Response.ContentType = "application/pdf";
            Response.BinaryWrite(byteArray);
            Response.Flush();
            Response.Close();
        }

        #region DropDown
        [HttpGet]
        public dynamic GetProviderForDD()
        {
            try
            {
                string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/Report/GetReportFunctionsForDD";
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