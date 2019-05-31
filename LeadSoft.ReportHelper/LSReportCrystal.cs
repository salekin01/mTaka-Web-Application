using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using iTextSharp.text.pdf;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using System.Collections;
using System.IO;
using Leadsoft.DAL;
using System.Data.Common;
using System.Data;

namespace LeadSoft.ReportHelper
{
    public class LSReportCrystal
    {
        #region Private Variables
        ReportDocument _crReportDocument;
        public ReportBase reportBase { get; set; }
        #endregion

        #region Constructors
        public LSReportCrystal()
            : base()
        {
            // Mark the ctor as Internal. So, from outside the local assembly user needs
            // to call the Static Methods to instantiate the class.
            try
            {
                CDataAccess objCDataAccess = CDataAccess.NewCDataAccess();
                DbCommand objDbCommand = objCDataAccess.GetMyCommand(false, IsolationLevel.ReadCommitted, "unknow", false);
            }
            catch { }

        }
        #endregion

        #region Method
        #region Public Methods
        #region LSReportCrystal
        public ReportDocument GenerateReport()
        {
            GetReport(reportBase.ReportName, reportBase.ReportParameterList, reportBase.BankName, reportBase.BranchName, false);
            return _crReportDocument;
        }


        #endregion
        #region IDisposable -- Implemetation of IDisposable
        public void Dispose()
        {
            // Ensure that the report is closed & disposed to free up the report processing job limit
            if (_crReportDocument != null)
            {
                _crReportDocument.Close();
                _crReportDocument.Dispose();
                _crReportDocument = null;
                // call GC to force collect the garbages -- not so sure whether this line is
                // necessary or not, but let us to be in the safe side.
                GC.Collect();
            }
        }
        #endregion
        #endregion
        #endregion

        #region Private Methods
        #region GetReport
        /// <summary>
        /// Get a crystal report object
        /// </summary>
        /// <param name="ReportName"></param>
        /// <param name="ReportParameterList"></param>
        private void GetReport(string pReportName, ArrayList pReportParameterList, string pBankName, string pBranchName, bool isVFile)
        {
            // Crystal Report doc
            if (_crReportDocument != null)
                _crReportDocument.Dispose();
            _crReportDocument = new ReportDocument();
            string reportPath = string.Empty;
            if (isVFile)
            {
                Random MyRandomNumber = new Random();
                string tmpReportName = pReportName.Replace(".rpt", "").Replace(".ltr", "") + MyRandomNumber.Next().ToString() + ".rpt";
                File.Copy(reportBase.ReportServerpath + @"\" + pReportName, reportBase.ReportServerpath + @"\ReportTempFiles" + @"\" + @"\" + tmpReportName);
                reportPath = reportBase.ReportServerpath + @"\ReportTempFiles" + @"\" + @"\" + tmpReportName;
            }
            else
            {
                reportPath = reportBase.ReportServerpath + @"\" + pReportName;
            }

            try
            {
                _crReportDocument.Load(reportPath);
                _crReportDocument.Refresh();
            }
            catch (Exception ex)
            {
                string msg = "The report file " + reportPath +
                            " can not be loaded, ensure that the report exists or the path is correct." +
                            "\nException:\n" + ex.Message +
                            "\nSource:" + ex.Source +
                            "\nStacktrace:" + ex.StackTrace;

                throw new Exception(msg);
            }


            int _subReport = _crReportDocument.Subreports.Count;
            if (reportBase.ReportParameterList != null)
            {
                // Check whether parameter lists are ok or not -- if the lsit is wrong
                // it will throw an exception from there and the following code will not be executed
                if (_subReport == 0)
                    CheckParameterList(reportBase.ReportParameterList, reportPath);
                //IDictionaryEnumerator ide = ReportParameterList.GetEnumerator();
                //while (ide.MoveNext())
                //{
                //   string ParaIndex = ide.Key.ToString();
                //    string ParaValue = ide.Value.ToString();
                //    PassParameter(ParaIndex, ParaValue);
                //}



                for (int i = 0; i < reportBase.ReportParameterList.Count; i++)
                {
                    string ParaIndex = reportBase.ReportParameterList[i].ToString();
                    string ParaValue = reportBase.ReportParameterList[i + 1].ToString();
                    PassParameter(ParaIndex, ParaValue);
                    i++;
                }
            }

            // Call Logon function for login from ReportDocument			
            if (!Logon())
            {
                // login failed
                string msg = "Can not login to Report Server " +
                            "\nDatabase Server: " + reportBase.DBServerName +
                            "\nDatabase:\n" + reportBase.DBName +
                            "\nDBUser:" + reportBase.DBUserId;

                throw new Exception(msg);
            }

            //_crReportDocument.DataDefinition.FormulaFields["BANK_NAME"].Text = "\"" + reportBase.BankName + "\"";
            //_crReportDocument.DataDefinition.FormulaFields["BRANCH_NAME"].Text = "\"" + reportBase.BranchName + "\"";



        }
        #endregion
        #region CheckParameterList
        /// <summary>
        /// Check whether parameter lists are ok or not -- if the lsit is wrong
        /// it will throw an exception from there and the following code will not be executed
        /// </summary>
        /// <param name="ReportParameterList"></param>
        private void CheckParameterList(ArrayList ReportParameterList, string ReportPath)
        {
            int ParamArrayCount = ReportParameterList.Count / 2;
            // Getting Value From the Report (Parameter and Formula Field)
            int ParameterFieldCount = _crReportDocument.DataDefinition.ParameterFields.Count;

            // Exclude parameter for subreport. Started with pm-
            for (int i = 0; i < _crReportDocument.DataDefinition.ParameterFields.Count; i++)
            {
                string paramName = _crReportDocument.DataDefinition.ParameterFields[i].ParameterFieldName.ToLower();
                if (paramName.StartsWith("pm-"))
                    ParameterFieldCount--;
            }

            // If Parameter on The Report and Array List Parameter Amount is not the same
            if (ParamArrayCount != ParameterFieldCount)
            {
                // get the param name defined at report
                string originalParamList = "Parameter list defined at report:";
                for (int i = 0; i < _crReportDocument.DataDefinition.ParameterFields.Count; i++)
                {
                    originalParamList += "\n" + _crReportDocument.DataDefinition.ParameterFields[i].ParameterFieldName;
                }

                // get the param name & value pased to report
                string passedParameterList = "Parameter list passed to report:";
                // generating error msg
                string msg = "Improper parameter list, Parameter defined at report do not match with parameter passed to report " +
                            "\nReport Path = " + ReportPath +
                            "\n" + originalParamList +
                            "\n" + passedParameterList;

                throw new Exception(msg);
            }
        }
        #endregion
        #region PassParameter

        private void PassParameter(string ParameterIndex, string ParameterValue)
        {
            _crReportDocument.SetParameterValue(ParameterIndex, ParameterValue);
        }
        #endregion
        #region Logon Methods
        private bool Logon()
        {
            // Declare and instantiate a new connection info object.
            ConnectionInfo ci = new ConnectionInfo();
            ci.Type = ConnectionInfoType.SQL;
            ci.AllowCustomConnection = true;
            ci.IntegratedSecurity = false;
            ci.ServerName = reportBase.DBServerName;
            ci.DatabaseName = reportBase.DBName;
            ci.UserID = reportBase.DBUserId;
            ci.Password = reportBase.DBPassword;
            //ci.Password = LSBuDbPasswordCrypto.verifyPassword(reportBase.DBPassword);
            //_crReportDocument.SetDatabaseLogon(reportBase.DBUserId,reportBase.DBPassword);
            // If the ApplyLogon function fails then return a false for this function.
            // Now applying logon information to the main report at this stage.
            // Though a Member variable we need to send the ReportDocument as param
            // bcz later on this ApplyLogon() will call itself for each subreport
            //if (!ApplyLogon(_crReportDocument, ci))
            //{
            //    return false;
            //}
            _crReportDocument.SetDatabaseLogon(reportBase.DBUserId, reportBase.DBPassword);

            // Loop through all the report objects and locate subreports.
            // If a subreport is found then apply logon information to the subreport.
            foreach (ReportObject obj in _crReportDocument.ReportDefinition.ReportObjects)
            {
                if (obj.Kind == ReportObjectKind.SubreportObject)
                {
                    SubreportObject subObj = (SubreportObject)obj;
                    // Check Apply LogOn for all subreports, if any one fail then entire report will fail
                    //if (!ApplyLogon(_crReportDocument.OpenSubreport(subObj.SubreportName), ci))
                    //{
                    //    return false;
                    //}
                }
            }

            // Return True if the code runs to this stage.
            return true;
        }


        #region ApplyLogin not requred!
        //private bool ApplyLogon(ReportDocument crReportDocument, CrystalDecisions.Shared.ConnectionInfo ci)
        //{
        //    // Declare the TableLogOnInfo object and a table object for use later.
        //    TableLogOnInfo tli;

        //    // For each table apply connection info
        //    foreach (Table tbl in crReportDocument.Database.Tables)
        //    {
        //        tli = tbl.LogOnInfo;
        //        tli.ConnectionInfo = ci;
        //        tbl.ApplyLogOnInfo(tli);
        //        //tli.ConnectionInfo = ci;
        //        tli.TableName = tbl.Name;

        //        tli.ConnectionInfo.UserID = ci.UserID;
        //        tli.ConnectionInfo.Password = ci.Password;
        //        //tli.ConnectionInfo.DatabaseName = ci.DatabaseName;
        //        //tli.ConnectionInfo.ServerName = ci.ServerName;



        //        // Verify that the logon was successful.
        //        // If TestConnectivity returns false, correct table locations.
        //        if (!tbl.TestConnectivity())
        //        {
        //            return false;
        //        }

        //        // set the table location/name
        //        if (tbl.Location.IndexOf(".") > 0)
        //        {
        //            // If there is a "." in the location then remove the
        //            // beginning of the fully qualified location.
        //            // eg: "dbo.northwind.customers" would become "customers".
        //            tbl.Location = tbl.Location.Substring(tbl.Location.LastIndexOf(".") + 1);
        //        }
        //        else
        //        {
        //            // If the location is not returning as a fully
        //            // qualified location we still set it to tbl.location
        //            // because Crystal Reports 9 & later version installed on top of .NET
        //            // can store fully qualified names but will only return
        //            // the table name itself.
        //            tbl.Location = ci.UserID + "." + tbl.Location;
        //        }
        //    }
        //    return true;
        //}
        #endregion
        #endregion
        #endregion
    }
}
