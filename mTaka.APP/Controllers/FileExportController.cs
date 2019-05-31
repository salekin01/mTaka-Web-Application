using iTextSharp.text;
using iTextSharp.text.pdf;
using LeadSoft.ReportHelper.Model;
using Microsoft.Reporting.WebForms;
using mTaka.APP.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace mTaka.APP.Controllers
{
    public class FileExportController : Controller
    {
        //[HttpPost]

        public byte[] FileExport(string ReportType)
        //public FileResult FileExport(string ReportType)
        {
            //ReportType = null;
            string url = ConfigurationManager.AppSettings["mTaka_server"] + "/api/FundIn/DailyFundIn";
            dynamic json = DataManipulation.SetObject(url, ReportType);

            List<FileExport> _FileExport = Newtonsoft.Json.JsonConvert.DeserializeObject<List<FileExport>>(json.ToString());

            FileExport fileExport = new FileExport();

            LocalReport localReport = new LocalReport();

            localReport.ReportPath = Server.MapPath("~/Reports/PerformanceReport.rdlc");

            ReportDataSource reportDataSource = new ReportDataSource();
            reportDataSource.Name = "PerformanceDataSet";
            reportDataSource.Value = _FileExport;

            localReport.DataSources.Add(reportDataSource);

            string reportType = "PDF";
            string mimeType;
            string encoding;
            string fileNameExtension = (ReportType == "003") ? "xlsx" : (ReportType == "002" ? "doc" : "pdf");
            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;

            renderedBytes = localReport.Render(reportType, "", out mimeType, out encoding,
                                                out reportType, out streams, out warnings);
            Response.AddHeader("content-disposition", "attachment; filename=Performance." + reportType);
            Response.ContentType = "application/octectstream";
            Response.BinaryWrite(renderedBytes);
            Response.End();
            //return File(renderedBytes, reportType);
            return renderedBytes;

            //Response.Write(string.Format("<script>window.open('{0}','_blank');</script>", "~/Reports/Print.html?file= Performance.pdf"));
        }

    }
}